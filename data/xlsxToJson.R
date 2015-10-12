require('XLConnect')
require('jsonlite')
library('reshape2')


wd <- "~/Desktop/Jobb//malmo150k/"
mapp <- "data/"
infil <- "prognos 2014-2040 könsuppdelad oavrundad.xlsx"
utfil <- "data.json"
blad <- "1-årsklasser år från år"
setwd(wd)

d <- readWorksheetFromFile(paste0(wd,mapp,infil), sheet = blad)
d$age <- factor(d$age)
d <- d[102:nrow(d),]   ## filtrera bort 2014
# d <- dcast(data = d,formula = age ~ year, value.var = s)

output <- toJSON(d, dataframe = 'row', factor = 'string')

cat(prettify(output), file = paste0(mapp,utfil), append = FALSE)

# write.csv(d, file = paste0(mapp,"data.csv"), row.names = FALSE)

###

