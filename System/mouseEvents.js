
class mouseEvents {
  constructor(e) {
    this.e = e
  }

  mouseButtons() {
    if (this.e.mousePressed()) {
      if (this.e.mouseButton === LEFT) {

      }
      if (this.e.mouseButton === RIGHT) {

      }
      if (this.e.mouseButton === CENTER) {

      }
    }
  }
}

//################################# MOUSE FUNCTIONS #######################

function mouseMoved() {
  //EVALUTE NEW POSITION OF MOUSE IN THE SOFTWARE SCALE WORLD
  control.mousePosition()

  //check if the mouse arrow is within the canvas
  if (control.mouseInsideCanvas()) {
    if (control.statusLineButton == false) {
      if (_model.m_curves.length >= 1) {

        for (var j = 0; j < _model.m_points.length; j++) {
          _model.m_points[j].getBoundBox(control.dx, control.dy)
        }

        for (var j = 0; j < _model.m_curves.length; j++) {
          _model.m_curves[j].getBoundBox(control.dx, control.dy)
        }

      }
      redraw()
    }

/*     //retangulo de seleção funcionando    
    if (control.statusLineButton == false) {
      if (control.statusPointButton == false) {
        if (_objectOfDrawing.isDrawing) {
          //verifica se os pontos estão dentro do retangulo  
          for (var j = 0; j < _model.m_points.length; j++) {
            var flag
            flag = _objectOfDrawing.getBoundBoxRatangleSelection(_model.m_points[j].x, -_model.m_points[j].y)
            if (flag) {
              console.log('teste')
              _model.m_points[j].selected = true
            }
          }

          redraw()
        }
      }
    } */

    if (control.statusLineButton) {
      control.typeCurvesToDraw()
    }
  }
}

//Description
//If argument is given, sets the sketch to fullscreen or not based on the value of the argument. 
//If no argument is given, returns the current fullscreen state. 
//Note that due to browser restrictions this can only be called on user input, for example, on mouse press like the example below.
//Syntax: fullscreen([val])
//Parameters val:Boolean: whether the sketch should be in fullscreen mode or not (Optional)
//Returns: Boolean: current fullscreen state
function mousePressed() {
  //check if the mouse arrow is within the canvas


  if (mouseButton === LEFT) {

  }

  if (mouseButton === RIGHT) {

  }
  if (mouseButton === CENTER) {

  }

}


function mouseReleased() {
  if (control.mouseInsideCanvas()) {
    if (mouseButton === LEFT) {

      if (control.statusLineButton == false) {
        if (_model.m_curves.length >= 1) {

          //verifica se o ponto foi selecionado ou descelecionado
          for (var j = 0; j < _model.m_points.length; j++) {
            if (_model.m_points[j].isPossibleToSelect) {
              if (_model.m_points[j].selected) {
                _model.m_points[j].selected = false
              } else {
                _model.m_points[j].selected = true
              }
            }
          }

          //verifica se a linha foi selecionada ou descelecionada
          for (var j = 0; j < _model.m_curves.length; j++) {
            if (_model.m_curves[j].isPossibleToSelect) {
              if (_model.m_curves[j].selected) {
                _model.m_curves[j].selected = false
              } else {
                _model.m_curves[j].selected = true
              }
            }
          }

        }
        redraw()
      }


      if (control.statusLineButton) {
        if (control.typeClickLine == 'firstClick') {
          control.createCurvesToDraw()
          _model.m_curves[_model.m_curves.length - 1].addPoint(control.dx, control.dy)
          control.typeClickLine = 'secondClick'
        } else if (control.typeClickLine == 'secondClick') {
          if (control.curveType == 'LINE') {
            control.statusLineButton = false
          }
          _model.m_curves[_model.m_curves.length - 1].addPoint(control.dx, control.dy)
          control.typeCurvesToDraw()
          control.createPoints()
          control.verifyIfPointIsEqual()
          redraw()
        }
      }

      //drawing points
      if (control.statusPointButton) {
        control.createCurvesToDraw()
        _model.m_curves[_model.m_curves.length - 1].addPoint(control.dx, control.dy)
        control.statusPointButton = false
        control.typeCurvesToDraw()
        control.createPoints()
        control.verifyIfPointIsEqual()
        redraw()
      }

    }
    if (mouseButton === RIGHT) {

    }
    if (mouseButton === CENTER) {
      if (control.statusLineButton && control.curveType == 'POLYLINE') {
        control.statusLineButton = false
        control.typeCurvesToDraw()
        redraw()
      } else {
        view.fitWorldToViewport(1.1)
      }

    }
  }
}

function mouseClicked() {
  
 /*    //retangulo de seleção ligado
    if (control.statusLineButton == false) {
      if (control.statusPointButton == false) {
        control.mousePosition()
        if (control.mouseInsideCanvas()) {
          if (_objectOfDrawing.isDrawing) {
            _objectOfDrawing.isDrawing = false
            control.inicialX = ''
            control.inicialY = ''
          } else {
            _objectOfDrawing.isDrawing = true
            _objectOfDrawing.inicialX = control.dx
            _objectOfDrawing.inicialY = control.dy
          }
        }
      }
    } */
  
}

function mouseWheel(event) {
  if (event.delta > 0)
    view.scaleWorldWindow(1.1)
  else if (event.delta < 0)
    view.scaleWorldWindow(1 / 1.1)
  else { }
}

//################################# MOUSE FUNCTIONS #######################