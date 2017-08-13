function IconMarkers(){
  this.base = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"
  this.colors = ['00CD66', 'a200ff', 'e69598', 'EE0000', '8E388E'];
  this.index = 0;
  this.IconToColor = {};

  this.getRandomColor = function(){
    return (Math.random()*0xFFFFFF<<0).toString(16)+"";
  }

  this.colorURL = function(color){
    return this.base + color;
  }

  this.getIconToColor = function(){
    return this.IconToColor;
  }
  this.getIcon = function(app_id){
    if (app_id in this.IconToColor){
        return this.IconToColor[app_id];
    }
    // If not there it means I need to create one
    if (this.index < this.colors.length){
        this.IconToColor[app_id] = {
            'url': this.colorURL(this.colors[this.index]),
            'color': this.colors[this.index]
          };
        this.index++;
    }else{
        // I have finished the default colors, let's create a random one
        const color = this.getRandomColor();

        this.IconToColor[app_id] = {
            'url': this.colorURL(color),
            'color': color
          };

    }
    return this.IconToColor[app_id];
  }

}

export default IconMarkers;
