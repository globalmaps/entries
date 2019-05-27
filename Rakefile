task :default do
  sh "hjson -c entries.hjson > tmp.json"
  sh "node filter.js > entries.json"
  sh "rm tmp.json"
  sh "browserify -o bundle.js -t [ babelify --presets [ @babel/preset-env ] ] app.js"
end

task :budo do
  sh "budo --open"
end

