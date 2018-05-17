$(document).ready(function(){


  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [-46.66990,-23.55762], //latitude e longitude do Hospital das Clínicas
        zoom: 4, //zoom inicial ao abrir a view
        maxZoon: 18,// se passar de 18 a imagem começa a quebrar
        minZoom: 2,

    })
  });


   var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: function(extent) {
          return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
              'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
              'outputFormat=application/json&srsname=EPSG:3857&' +
              'bbox=' + extent.join(',') + ',EPSG:3857';
        },
        strategy: ol.loadingstrategy.bbox
      });


      var vector = new ol.layer.Vector({//função que adiciona Layer no mapa
        source: vectorSource,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2// borda da layer
          })
        })
      });

      var raster = new ol.layer.Tile({
        source: new ol.source.BingMaps({
          imagerySet: 'Aerial',
          key: 'Ajd0MPIeBDiUUS-xcwOz841kcrlgFE0r2e6xLuQ0cUvl_3KIBYLThYfy-jzHCt6J'//Key BingMap
        })
      });

      var map = new ol.Map({
        layers: [raster, vector],
        target: document.getElementById('map'),
        view: new ol.View({
          center: [-8908887.277395891, 5381918.072437216],
          maxZoom: 18,
          zoom: 12
        })
      });

//***************IGNORAR O CÓDIGO ACIMA*******************

      var canvas =document.getElementById('canvas');//associa o id do html para um atributo do JavaScript
      var ctx = canvas.getContext('2d');//passa como informação que tudo q será adicionado no canvas será em 2d
      var marker =document.getElementById('marker');

      //Localizaçãos
    //  var lat=30*Math.random()+ 'px'; //Math.random() função q gera numeros aleatórios
      //var long =20*Math.random()+ 'px';


      //Desenhando uma imagem
      //  var img=new Image();
    //    img.onload = function(){
    //    ctx.drawImage(img,0,0);
    //    };
    //  img.src="img/bluep-01.jpg";


//marcador






   marker = new Path2D();
    ctx.beginPath();
    ctx.arc(900, 200, 40, 0, 2*Math.PI); // X (centro), Y (centro),Raio,Início: 90 graus
    ctx.fill();
    ctx.stroke();








});
