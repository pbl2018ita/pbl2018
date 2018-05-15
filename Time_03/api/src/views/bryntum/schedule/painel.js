/* global App */
Ext.ns('App'); //Cria um NameSpace chamado App

Ext.Loader.setConfig({ enabled: true, disableCaching: true });
//Ext.Loader.setPath('Sch', '../../js/Sch');

Ext.require([
	'Sch.panel.SchedulerGrid'
]);

function PainelScheduler(renderTo) {

    //Cria o grafico
    this.load = function (dbData, renderTo, isEdit) {

        //Evento de Resize da janela
        Ext.EventManager.onWindowResize(function () {
            App.Scheduler.scheduler.width = Ext.getBody().getViewSize().width - 20;
            App.Scheduler.scheduler.height = Ext.getBody().getViewSize().height - 50;
            App.Scheduler.scheduler.getSchedulingView().refresh()
        });

        Ext.onReady(function () {
            Ext.QuickTips.init(); //biblioteca de Tooltip do Ext.JS

            App.Scheduler.init(dbData, renderTo, isEdit);

            //console.log(dbData);
        });
    };
    this.App = function () { return App.Scheduler.scheduler }
}



App.Scheduler = {

    // Initialize application
    init: function (dbData, renderTo, isEdit) {

        //limpa a div antes de desenhar
        $("#" + renderTo).empty();

        this.scheduler = this.createScheduler(dbData, renderTo, isEdit);
        this.populateScheduler(dbData);
        this.dbData = dbData;

        //relativo ao pool de janelas de edicao
        this.arrayWin = [];

        //configuracao inicial
        this.scheduler.setTimeColumnWidth(90);
        this.scheduler.setStart(new Date(moment(dbData.ReferenceDate.setStart).format()));

    },

    // Listener de eventos de teclado
    keysListener: function (event) {
        var key = event.keyCode;
        switch (key) {
            case 109: // minus
            case 40: // arrow bottom
                this.scheduler.zoomOut();
                break;
            case 107: // plus
            case 38: // arrow up
                this.scheduler.zoomIn();
                break;
            case 37: // arrow left
                this.scheduler.shiftPrevious();
                break;
            case 39: // arrow right
                this.scheduler.shiftNext();
                break;
            default:
        }
    },

    // carga dos dados Json
    populateScheduler: function (dbData) {
        this.scheduler.resourceStore.loadData(JSON.parse(dbData.resourceStore));
        this.scheduler.eventStore.loadData(JSON.parse(dbData.eventStore));
    },

    // relativo a criacao do painel Scheduler
    createScheduler: function (dbData, renderTo, isEdit) {
        /*-----------------------------------
        configuracao de Width e Height
        -------------------------------------*/
        //var myWidth = ($(window).width() || $(document).width()) - 20;
        //var myHeight = ($(window).height() || $(document).height()) - 50;
        var myWidth = Ext.getBody().getViewSize().width - 20;
        var myHeight = Ext.getBody().getViewSize().height - 50;


        /*--------------------------------------------------------------
        relativo ao painel de recursos, Static Panel
        configuracao das colunas do Painel estatico
        ----------------------------------------------------------------*/
        Ext.define('Resource', { extend: 'Sch.model.Resource', fields: [{ name: 'Category' }, { Id: 'Id' }, { name: 'Available' }] });
        var resourceStore = Ext.create('Sch.data.ResourceStore', { model: 'Resource', sorters: { property: 'Category', direction: "ASC" /*--> relativo ordencao da coluna, static Panel*/ } });

        var cfgResourceColumns =
            [{ header: '#', sortable: true, width: 20, dataIndex: 'empNumber' },
             {
                 header: 'Employees', sortable: true, width: myWidth * .1, flex: 1, width: 120, dataIndex: 'Name',
                 renderer: function (v, m, r) {
                     m.tdCls = r.get('Category');
                     return v;
                 }
             },
             { header: 'Technol.', sortable: true, width: 80, dataIndex: 'Category' },
             {
                 header: 'CT', sortable: true, width: 120, dataIndex: 'CT',
                 renderer: function (v, m, r) {
                     m.tdCls = r.get('CT_Color');
                     return (v);
                 }
             }];


        /*---------------------------------------------------------------------------------------------
        relativo aos eventos, linhas de schedule, Dynamic Panel
        http://www.bryntum.com/docs/scheduling/4.x/?#!/api/Sch.data.EventStore
        Relativo ao Template de Formatacao e Renderizacao das barras dinamicas customizadas
        -----------------------------------------------------------------------------------------------*/
        Ext.define('Event', { extend: 'Sch.model.Event', nameField: 'Title', fields: [{ name: 'Title', mapping: 'Title' }, { name: 'orderStatus' }, { name: 'LR' }, { name: 'order' }, { name: 'orderStatus' }, { name: 'pn' }, { name: 'cemb' }, { name: 'cc' }, { name: 'ct' }, { name: 'hh' }, { name: 'start' }, { name: 'finish' }, { name: 'Percent' }, { name: 'State' }, { name: 'Comment' }, { name: 'Workers' }] });
        var eventStore = Ext.create('Sch.data.EventStore', { model: 'Event' });

        var eventRenderer = function (event, resource, tplData, row, col, ds) {
            var cls = "evt-{0} {1} {2}";
            tplData.cls = Ext.String.format(cls, resource.get('Category'), event.get('operStatus') + '_BAR');

            var styleString = "width:{0}%; left:{1}%;";
            var percent = event.get('Percent');
            var comment = event.get('Comment');
            //console.log(comment);
            return { cc: event.get('cc'), LR: event.get('LR'), Title: event.get('Title'), percent: percent, State: event.get('State'), orderStatus: event.get('orderStatus'), operStatus: event.get('operStatus'), percentBarStyle: Ext.String.format(styleString, percent, 0) /*, percentBarStyle: Ext.String.format(styleString, 0, 100 - percent), prodName: event.get('Name')*/ };
        };

        var eventBodyTemplate = new Ext.Template('<div class="state-{State} {operStatus}_TITLE barText"> {Title} </div><div style="{percentBarStyle}" class="percentBar {operStatus}_PERC">{percent}%</div><div class="inf" style="margin-right: 0;float: right;margin-top: -17px;"></div>');



        /*----------------------------------------------------------------
        Relativo ao Template de Formatacao e Configuracao dos Tooltips das barras dinamicas customizadas
        http://docs.sencha.com/extjs/4.0.7/#!/api/Ext.tip.ToolTip-cfg-dismissDelay
        ----------------------------------------------------------------*/
        function configTooltipTemplateTemplate() {
            var rTip = '<b class="tipTitle">{0}: </b>{1}';
            var dTip = '<b class="tipTitle">{0}: </b><span class="tipDate">{1}</span>';

            var activityTitle = '<div class="tipDescr">{Title}</div>';
            var LR = String.format(rTip, 'LR', '{LR}');
            var order = String.format(rTip, 'Order', '{order} (MES)');
            var pn = String.format(rTip, 'P/N', '{pn}');
            var cemb = String.format(rTip, 'CEMB', '{cemb}');
            var ct = String.format(rTip, 'CT', '{ct} (Primavera)');
            var hh = String.format(rTip, 'HH', '{hh} hours (Roteiro MES)');
            var Workers = String.format(rTip, 'QTD MO', '{Workers} (Primavera)');
            var orderStatus = '<div class="{orderStatus} tipStatus">Order Status: {orderStatus}</div>';
            var operStatus = '<div class="{operStatus} tipStatus">LR Status: {operStatus}</div>';
            var start = String.format(dTip, 'Start', "{start}");
            var finish = String.format(dTip, 'Finish', "{finish}");
            var percent = String.format(rTip, 'Percent', "{Percent}%");
            var comment = String.format(rTip, 'Comment', "{Comment}");
            var prodName = String.format(rTip, 'Name', '{prodName}');
            var ResourceId = String.format(dTip, 'Resource', '{ResourceIdView}');
            var tempTip = String.format('{0}{1}<br>{2}<br>{3}<br>{4}<br>{5}<br>{6}<br>{7}<br>{8}{9}{10}<br>{11}<br>{12}<br>{13}<br><div class="tipComm">{14}</div>',
                activityTitle, order, LR, pn, cemb, ct, hh, Workers, orderStatus, operStatus, start, finish, percent, ResourceId, comment);

            //Duration in hours
            //var duration = String.format(rTip, 'Duration', Math.round((endDate - startDate) / (1000 * 60 * 60))) + 'h';
            return new Ext.Template(tempTip);
        }
        var tooltipTemplate = configTooltipTemplateTemplate();
        var tooltipConfig = { cls: 'sch-tip', showDelay: 50, autoHide: true, dismissDelay: 60000, anchor: 'b'/*, trackMouse: true*/ }




        /*----------------------------------------------------------------
        Relativo aas linhas verticais e Zonas Sombreadas
        ----------------------------------------------------------------*/
        Ext.define('Line', { extend: 'Ext.data.Model', fields: ['Date', 'Text', 'Cls'] });
        var lineStore = Ext.create('Ext.data.JsonStore', { model: 'Line', data: [{ Date: new Date(moment(dbData.ReferenceDate.VerticalLine).format()), Text: 'Today', Cls: 'verticalLine' }] });

        Ext.define('Zone', { extend: 'Sch.model.Range', fields: ['Type'] });
        var zoneStore = Ext.create('Ext.data.JsonStore', { model: 'Zone', data: JSON.parse(dbData.ReferenceDate.Zones) });

        plugins = [this.zonePlugin = Ext.create("Sch.plugin.Zones", { store: zoneStore }), Ext.create("Sch.plugin.Lines", { store: lineStore })];


        /*----------------------------------------------------------------
        Relativo a habilitar o drag and drop
        ----------------------------------------------------------------*/
        var readOnly = true;
        if (isEdit == '1' || isEdit == true) {
            readOnly = false;
        }

        /*----------------------------------------------------------------
        Criacao/Inicializacao do Scheduler
        ----------------------------------------------------------------*/
        var g = Ext.create("Sch.panel.SchedulerGrid", {
            readOnly: readOnly,
            width: myWidth,
            height: myHeight,
            renderTo: renderTo,
            allowOverlap: true,
            border: true,
            viewPreset: 'hourAndDay', //'dayAndWeek' //http://www.bryntum.com/docs/scheduling/3.x/?#!/api/Sch.preset.Manager
            startDate: new Date(moment(dbData.ReferenceDate.DAT_PIPO_INI).format()),
            endDate: new Date(moment(dbData.ReferenceDate.DAT_PIPO_FIM).format()),
            rowHeight: 30, //altura da linha

            /*---------------------------------------------------------------
            Relativo a rederizacao das linhas do painel dinamico 
            -----------------------------------------------------------------*/
            eventStore: eventStore,
            eventRenderer: eventRenderer,
            eventBodyTemplate: eventBodyTemplate,

            /*----------------------------------------------------------------
            configuracao do painel estatico e das colunas do painel estatico          
            -----------------------------------------------------------------*/
            resourceStore: resourceStore,
            columns: cfgResourceColumns,

            /*------------------------------
            configuracao do Tooltip na area sem evento
            --------------------------------*/
            createConfig: {
                hoverTip: {
                    getText: function (date, e) {
                        var resource = this.schedulerView.resolveResource(e.getTarget());
                        if (!resource.get('Available')) {
                            return 'Resource not available';
                        }
                    }
                }
            },

            /*------------------------------
            configuracao do Tooltip 
            --------------------------------*/
            tipCfg: tooltipConfig,
            tooltipTpl: tooltipTemplate,

            /*----------------------------------------------------------------
            Relativo a plugins de linhas verticais e Zonas Sombreadas
            ----------------------------------------------------------------*/
            plugins: plugins,


            viewConfig: {
                getRowClass: function (resourceRecord) {
                    if (!resourceRecord.get('Available')) {
                        return 'unavailable';
                    }
                    return '';
                }
            },

            //Sch.view.SchedulerGridView, Sch.model.Event, Ext.event.Event
            //https://www.bryntum.com/docs/scheduling/5.x/?#!/api/Sch.mixin.SchedulerView-event-eventdrop
            listeners: {
                //Chamada do portal MES ou copia do LR para o Clipboard se em modo edicao
                eventclick: function (scheduler, event, e, eOpts) {
                    if (readOnly == false) {

                        //copy o texto para o ClipBoard
                        function copyToClipboard(text) {
                            var $temp = $("<input>");
                            $("body").append($temp);
                            $temp.val(text).select();
                            document.execCommand("copy");
                            $temp.remove();
                        }
                        //corrige o LR para o padrao Primavera
                        function fixLR(lr) {
                            var temp = lr.split(".");
                            return String.format('{0}.{1}', temp[0], Number(temp[1]))
                        }
                        copyToClipboard(fixLR(event.get('LR')));
                    }
                    else
                        window.open(event.get('linkDrill'));
                },
                eventdbclick: function (scheduler, event, e, eOpts) { }, //nao funciona devido eventclick
                //Configuracao do nome dos operadores
                itemdblclick: this.EditResourceNamesOnDoubleClick,
                scheduledblclick: function (schedulerView, clickedDate, rowIndex, resource, e, eOpts) { },

                eventdragstart: function (scheduler, records, eOpts) { },

                eventdrag: function (scheduler, records, date, resource, dragData, eOpts) { },

               



                scope: this // Make this point to App.Scheduler
            },

            /*------------------------------
            Setup da Barra de Titulo
            --------------------------------*/
            tbar: [
                {
                    iconCls: 'fa fa-refresh fa-2x', // 'icon-prev',
                    tooltip: 'Reload',
                    handler: function () {
                        __doPostBack("reload", '');
                        //startGTO();
                    }
                },
                {
                    iconCls: 'fa fa-caret-left fa-2x', // 'icon-prev',
                    tooltip: 'Previous Date',
                    handler: function () {
                        g.shiftPrevious()
                    }
                },
                {
                    iconCls: 'fa fa-search-plus fa-2x', // 'zoomIn',
                    tooltip: 'Zoom In',
                    handler: function () {
                        g.zoomIn()
                    }
                }, {
                    iconCls: 'fa fa-search-minus fa-2x', // 'zoomOut',
                    tooltip: 'Zoom Out',
                    handler: function () {
                        g.zoomOut()
                    }
                }, {
                    iconCls: 'fa fa-caret-right fa-2x', //'icon-next',
                    tooltip: 'Next Date',
                    handler: function () {
                        g.shiftNext()
                    }
                }, '-', {
                    iconCls: 'fa fa-step-backward fa-2x',
                    tooltip: 'Early Date',
                    handler: function () {
                        g.setStart(new Date(moment(dbData.ReferenceDate.earlyDate).format()))
                    }
                },
                {
                    //text: 'Today',
                    tooltip: 'At this time',
                    iconCls: 'fa fa-flash fa-2x',
                    handler: function () {
                        g.setStart(new Date())
                    }
                }, {
                    text: '<span style="font: bold 15px Arial">PIPO</span>',
                    tooltip: 'PIPO Embraer',
                    handler: function () {
                        g.setStart(new Date(moment(dbData.ReferenceDate.DAT_PIPO_INI).format()))
                    }
                }, {
                    tooltip: 'Last Date',
                    iconCls: 'fa fa-step-forward fa-2x',
                    handler: function () {
                        g.setStart(new Date(moment(dbData.ReferenceDate.lateDate).format()))
                    }
                }, '-', {
                    id: 'col-slider',
                    xtype: 'slider',
                    width: 60,
                    value: 90,
                    increment: 10,
                    minValue: 0,
                    maxValue: 200,
                    listeners: {
                        change: function (slider, value) {
                            g.setTimeColumnWidth(value);
                        },

                        changecomplete: function (slider, value) {
                            g.setTimeColumnWidth(value);
                        }
                    }
                }, '-', {
                    id: 'row-slider',
                    xtype: 'slider',
                    width: 60,
                    value: 30,
                    increment: 10,
                    minValue: 30,
                    maxValue: 60,
                    listeners: {
                        change: function (slider, value) {
                            g.setRowHeight(value);
                        },

                        changecomplete: function (slider, value) {
                            g.setRowHeight(value);
                        }
                    }
                }, '-', '<span class="fa fa-filter fa-2x" />', {
                    xtype: 'textfield',
                    emptyText: 'Filter by activity name or LR',
                    width: 175,
                    triggers: {
                        remove: {
                            cls: 'x-form-clear-trigger',
                            handler: function () {
                                this.setValue('');
                            }
                        }
                    },
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            eventStore.clearFilter(); //limpa filtro
                            if (newValue) {
                                var regexps = Ext.Array.map(newValue.split(/\s+/), function (token) {
                                    return new RegExp(Ext.String.escapeRegex(token), 'i');
                                });
                                var length = regexps.length;
                                eventStore.filterBy(function (me) {
                                    var name = me.get('Title');
                                    var lr = me.get('LR');

                                    // blazing fast "for" loop! :)
                                    for (var i = 0; i < length; i++)
                                        if (!regexps[i].test(name) && !regexps[i].test(lr)) return false;

                                    return true;
                                });
                            }
                            else {
                                eventStore.clearFilter();
                            }
                        },

                        specialkey: function (field, e, t) {
                            if (e.keyCode === e.ESC) field.reset();
                        }
                    }
                },
                '<span class="fa fa-users fa-2x" />', {
                    xtype: 'combo',
                    id: 'tecnCombo',
                    store: dbData.categories, // eventStore.collect('Title')
                    triggerAction: 'all',
                    editable: false,
                    width: 80,
                    value: "Todos",
                    listeners: {
                        select: function (combo, record, index) {
                            var nValue = combo.getValue();
                            resourceStore.clearFilter(); //limpa filtro

                            if (nValue != undefined && nValue != 'Todos') {
                                var regexps = Ext.Array.map(nValue.split(/\s+/), function (token) {
                                    return new RegExp(Ext.String.escapeRegex(token), 'i');
                                });
                                var length = regexps.length;

                                resourceStore.filterBy(function (resource) {
                                    var name = resource.get('Category');

                                    // blazing fast "for" loop! :)
                                    for (var i = 0; i < length; i++)
                                        if (!regexps[i].test(name)) return false;

                                    return true;
                                });
                            }
                            else if (nValue == 'Todos') {
                                resourceStore.clearFilter();
                            }
                        }
                    }
                },
                'Date:',
                { //http://docs.sencha.com/extjs/6.0/6.0.1-classic/#!/api/Ext.form.field.Date
                    id: 'datInic',
                    enableToggle: true,
                    toggleGroup: 'span',
                    scope: this,
                    xtype: 'datefield',
                    format: 'd/m/Y', //d F Y
                    //minDate: new Date(),
                    width: 90,
                    value: new Date(moment(dbData.ReferenceDate.DAT_PIPO_INI).format()),
                    listeners: {
                        select: function (field, value, eOpts) {
                            // var D = Ext.Date;
                            var currentDate = value;
                            var currentDay = currentDate.getDay();
                            var date = currentDate.getDate(); //- currentDay;
                            var StartDate = new Date(currentDate.setDate(date));
                            //dp.scheduler.setTimeSpan(D.add(date, D.HOUR, 8), D.add(date, D.HOUR, 18));
                            g.startDate = StartDate;
                            g.setTimeSpan(StartDate, g.endDate);
                        }
                    }
                },
                ' \- ',
                { //http://docs.sencha.com/extjs/6.0/6.0.1-classic/#!/api/Ext.form.field.Date
                    id: 'datFim',
                    enableToggle: true,
                    toggleGroup: 'span',
                    scope: this,
                    xtype: 'datefield',
                    format: 'd/m/Y', //d F Y
                    //minDate: new Date(),
                    width: 90,
                    value: new Date(moment(dbData.ReferenceDate.DAT_PIPO_FIM).format()),
                    listeners: {
                        select: function (field, currentDate, eOpts) {
                            var date = currentDate.getDate();
                            g.endDate = new Date(currentDate.setDate(date + 1));
                            g.setTimeSpan(g.startDate, g.endDate);
                        }
                    }
                },
                 {
                     text: '<i class="fa fa-sitemap fa-2x fa-rotate-270" aria-hidden="true"></i>',
                     tooltip: 'Choose a node',
                     handler: function () {
                         $('#modalGTOTitle').html('Alterar Fase');
                         $('#modalGTOBody').html('');
                         //Ext.getCmp('modalGTO').show();
                         //Ext.ComponentQuery.query('#modalGTO')[0].show();
                         //https://jsperf.com/extjs-show-hide-add-removecls
                         $('#modalGTO').modal('show');
                     }
                 },  
                //{text: 'Fit columns',scope: this,handler: function () {/*Ext.getCmp('colwidth-slider').suspendEvents();*/g.getSchedulingView().fitColumns();/*Ext.getCmp('colwidth-slider').resumeEvents();*/}},
                '->',
                String.format("<div class='titleGTO'>{0} - Posi\u00e7\u00e3o: {1}</div>", dbData.aviao, dbData.Posicao)//.bold()
            ]
        });

        return g;
    },


    /*-----------------------------------------------------------------------------------
    Funcao responsavel pela janela de edicao dos recursos, acionado no doubleClick na linha
    -----------------------------------------------------------------------------------*/
    EditResourceNamesOnDoubleClick: function (dv, record, item, index, e) {
        //para ferchar eventual tela de edicao anterior
        var tempWin = this.arrayWin.pop();
        if (tempWin != undefined)
            tempWin.destroy();

        var id = record.get('Id')
        var empNames = record.data.Name.split("/");

        //http://www.objis.com/formationextjs/lib/extjs-4.0.0/docs/api/Ext.window.Window.html
        var emp1 = empNames[0];
        var emp2 = empNames[1];
        var emp3 = empNames[2];

        if (emp1 == null)
            emp1 = record.data.NameEmp

        if (emp2 == null)
            emp2 = record.data.NameEmp

        if (emp3 == null)
            emp3 = record.data.NameEmp

        //relativo ao painel de configuracao de funcionarios, no double-click
        var fp = new Ext.FormPanel({
            // renderTo: win,//I just guess that I can render this to the window I created...
            //fileUpload: true,
            width: 500,
            height: 180,
            closeAction: 'hide',
            frame: true,
            //title: 'File Upload Form',
            autoHeight: true,
            beforetooltipshow: this.beforeTooltipShow,
            bodyStyle: 'padding: 10px 10px 0 10px;',

            // labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },

            defaultType: 'textfield',
            items: [{
                xtype: 'label',
                text: String.format('Configura\u00e7\u00e3o da {0} ({1} / CT: {2})', this.dbData.Posicao,
                    record.get('Category'), record.get('CT'))
            }, {
                xtype: 'hiddenfield',
                name: 'Category',
                value: record.get('Category')
            }, {
                xtype: 'hiddenfield',
                name: 'CT',
                value: record.get('CT')
            }, {
                xtype: 'hiddenfield',
                name: 'NodeId',
                value: this.dbData.nodeId
            }, {
                xtype: 'hiddenfield',
                name: 'Login',
                value: this.dbData.login
            }, {
                xtype: 'hiddenfield',
                name: 'Id',
                value: record.get('Id')
            }, {
                xtype: 'textfield',
                fieldLabel: 'Turno 1',
                name: 'T1',
                emptyText: 'Funcionario do turno 1',
                value: emp1.trim()
            }, {
                xtype: 'textfield',
                fieldLabel: 'Turno 2',
                name: 'T2',
                emptyText: 'Funcionario do turno 2',
                validateOnBlur: true,
                value: emp2.trim()
            }, {
                xtype: 'textfield',
                fieldLabel: 'Turno 3',
                name: 'T3',
                disabled: true,
                emptyText: 'Funcionario do turno 3',
                value: emp3.trim()
            }],

            buttons: [{
                text: 'Save',
                handler: function () {
                    Loading1.show();
                    var form = this.up('form').getForm();
                    var postData = form.getValues();
                    if (form.isValid()) {
                        form.submit({
                            url: gto_Handler + '?method=SaveEmployeeConfig',
                            params: {
                                postData: JSON.stringify(postData)
                            },
                            success: function (form, action) {
                                Loading1.hide();
                                win.destroy();
                                toastr["success"]("Operador Salvo com Sucesso", "Sucesso");

                                var jsonObj = JSON.parse(App.Scheduler.dbData.resourceStore);
                                //laco para identificar o id alterado
                                for (var i = 0; i < jsonObj.length; i++) {
                                    if (jsonObj[i].Id == postData.Id) {
                                        jsonObj[i].Name = action.result.Name;
                                        break;
                                    }
                                }
                                App.Scheduler.dbData.resourceStore = JSON.stringify(jsonObj);
                                App.Scheduler.scheduler.resourceStore.loadData(JSON.parse(App.Scheduler.dbData.resourceStore));
                                //App.Scheduler.populateScheduler(App.Scheduler.dbData)
                            },
                            failure: function (form, action) {
                                //Ext.Msg.alert('Failed', action.result.msg);
                                toastr["error"]("Ocorreu um problema ao salvar o operador", "Error");
                                Loading1.hide();
                            }
                        });

                    }
                }

            }, ]
        });

        var win = Ext.create('Ext.window.Window', { title: 'Configuracao do Time de Trabalho', width: 510, items: [fp] });

        this.arrayWin.push(win);
        win.show();
    }
};



function inform(event) {
    $('#modalInfoTitle').html('Informacoes Ordem: <span style="color: #33c; font-weight: bold;">' + event.get('order') +
        '</span>');
    $('#modalInfo').modal('show');
};

///Formata a data no padrao desejado
function formatDate(myDate) {
    return moment(myDate).format('DD/MMM/YYYY HH:mm');
}

//Formatacao do campos De Para 
function dePara(antes, depois) {
    return "<div class='tipTopic'><b>From:&nbsp;</b>" + antes + "</div><div class='tipTopic'><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To:&nbsp;</b>" + depois + "</div>";
}

//obtem o tamanho do array
function getSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}