library(shiny)
library(leaflet)

shinyUI(fluidPage(
  titlePanel("[REPORT]: Map of the Accidents"),
  leafletOutput("myMap")
))