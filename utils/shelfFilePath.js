export const getFile = (style_id, direction) => {
  if (direction == "left") {
    switch (style_id) {
      case 1:
        return require("../assets/shelfs/shelf_style_1/left/shelf.png");
      // case 2:
      //   return require("../assets/shelfs/shelf_style_2/left/shelf.png");
      case 2:
        return require("../assets/shelfs/shelf_style_3/left/shelf.png");
      case 3:
        return require("../assets/shelfs/shelf_style_4/left/shelf.png");
      case 4:
        return require("../assets/shelfs/shelf_style_5/left/shelf.png");
    }
  } else {
    switch (style_id) {
      case 1:
        return require("../assets/shelfs/shelf_style_1/right/shelf.png");
      // case 2:
      //   return require("../assets/shelfs/shelf_style_2/right/shelf.png");
      case 2:
        return require("../assets/shelfs/shelf_style_3/right/shelf.png");
      case 3:
        return require("../assets/shelfs/shelf_style_4/right/shelf.png");
      case 4:
        return require("../assets/shelfs/shelf_style_5/right/shelf.png");
    }
  }
};
