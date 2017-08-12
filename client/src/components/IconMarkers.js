function IconMarkers(){
  this.base = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"
  this.colors = ['1E90FF', '00CD66', 'FFA500', 'EE0000', '8E388E'];
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
        this.IconToColor[app_id] = this.colorURL(this.colors[this.index]);
        this.index++;
    }else{
        // I have finished the default colors, let's create a random one
        this.IconToColor[app_id] = this.colorURL(this.getRandomColor());
    }
    return this.IconToColor[app_id];
  }

}

export default IconMarkers;
