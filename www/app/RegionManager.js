function RegionManager(){
    var currentView;
    var el = "#container";
    var region = {};

    var closeView = function (view) {
      if (view && view.close) {
        view.close();
      }
    };

    var openView = function (view) {
      if (! $("#container").length){
        var viewDiv = document.createElement("div");
        viewDiv.setAttribute("id", "container");
        viewDiv.setAttribute("role", "main");
        $("body").append(viewDiv);
      }
      view.render();
      $(el).html(view.html);
      if (view.onShow) {
        view.onShow();
      }
    };

    region.show = function (view) {
      closeView(currentView);
      currentView = view;
      openView(currentView);
    };

    return region;
  }