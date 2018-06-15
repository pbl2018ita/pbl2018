library(shiny)
library(leaflet)

server = function(input, output) {
  map <- leaflet("myMap", width = "100%", height="100%") %>%
    addTiles() %>%
    setView(-46.64, -23.536, zoom = 14) %>%
    addMarkers(runif(500, -46.6450, -46.6353),
               runif(500, -23.5431, -23.5332),
               clusterOptions = markerClusterOptions())
  
  output$myMap = renderLeaflet(map)
  leafletOutput("myMap", width = "100%", height="100%")
}