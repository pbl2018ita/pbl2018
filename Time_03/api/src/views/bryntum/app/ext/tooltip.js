Ext.define('app.ext.tooltip', {
    template: null,
    config: {
        cls: 'sch-tip',
        showDelay: 50,
        autoHide: true,
        dismissDelay: 60000,
        /*, trackMouse: true*/
        anchor: 'b'
    },
    constructor: function () {
        var myTemplate = `
            <div class="card">
                <fieldset class="">
                    <legend>
                        <i class="fa fa-id-card"></i>
                        <i class="fa fa-mars"></i>
                        <!--
                        <i class="fa fa-venus"></i>
                        -->
                        Name: {name}
                        <!--Id Paciente: {PatientId}-->
                    </legend>
                    <table>
                        <tr>
                            <td><img src="images/{PatientId}.png" alt="{Name}" style="width:60px"></td>
                            <td>
                                <p>{name}</p>
                                <p>{Age} Y.O.</p>
                                <p class="detail">Wound: {wound}</p> 
                                <p class="manch{manchester}">Manchester: {manchester}</p>
                                <p class="detail">Body Part: {body_part}</p>
                            </td>
                        </tr>
                    </table            
                </fieldset>
                <p>
                    <i class="fa fa-heartbeat"></i> {heartbeat} bpm | {blood}
                </p>
                <p>
                    <i class="fa fa-thermometer-half"></i> {temperature} C
                </p>
                <p>
                    <!--
                    <i class="fa fa-hospital-o"></i>
                    <i class="fa fa-wheelchair"></i>
                    <i class="fa fa-ambulance"></i>
                    -->
                    <i class="fa fa-bed"></i> {place}
                </p>
                <fieldset class="medkit">
                    <legend>
                        <i class="fa fa-medkit"></i>
                    </legend>
                    <li>Paracetamol</li>
                    <li>Morfina</li>
                </fieldset>
            </div>`;

        /*
        var rTip = '<b class="tipTitle">{0}: </b>{1}';
        var dTip = '<b class="tipTitle">{0}: </b><span class="tipDate">{1}</span>';

        var Nome = Ext.String.format(rTip, 'Nome', '{Name}');
        var ID = Ext.String.format(rTip, 'ID', '{PatientId}');
        var blood = Ext.String.format(rTip, 'Tipo Sanguineo', '{blood}');


        var tempTip = Ext.String.format('{0}<br>{1}<br>{2}<hr>', Nome, ID, blood);
        */
        return new Ext.Template(myTemplate);
    },
})





