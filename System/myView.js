class myView {
    constructor(model) {

        //camera atributes
        this.x = 0
        this.y = 0
        this.z = (height / 2) / (PI / 6)
        this.centerX = 0
        this.centerY = 0
        this.centerZ = 0
        this.upX = 0
        this.upY = 1
        this.upZ = 0

        //projection atributes
        this.projection

        //ortho
        this._left = -1
        this._right = 9
        this._bottom = -1
        this._top = 9
        this._near = 0.1
        this._far = 1000
        //perspective
        this.fovy = PI / 3.0
        this.aspect = width / height

        //moviment atributes
        this._space = 5
        this.cam = createCamera(this.x, this.y, this.z,
            this.centerX, this.centerY, this.centerZ,
            this.upX, this.upY, this.upZ)

        this.cam.ortho(this._left, this._right, this._bottom,
            this._top, this._near, this._far);

        //loop
        this.angle = 0

        //set model
        this.model = model

    }

    setOrthoValues(bounding) {
        this._left = bounding[0].x
        this._right = bounding[1].x
        this._bottom = -bounding[0].y
        this._top = -bounding[1].y
    }

    camera(projection) {
        //setting projection
        if (projection == perspective) {
            this.cam.perspective(this.fovy, this.aspect, this._near, this._far)
        } else {
            this.cam.setPosition(this.x, this.y, this.z)
            this.cam.lookAt(this.centerX, this.centerY, this.centerZ)
            this.cam.ortho(this._left, this._right, this._bottom,
                this._top, this._near, this._far);
        }
    }

    panWorldWindow(_panFacX, _panFacY) {
        let panX = abs(this._right - this._left) * _panFacX
        let panY = abs(this._top - this._bottom) * _panFacY

        //shift windown
        this._left += panX
        this._right += panX

        this._top += panY
        this._bottom += panY

        redraw()
    }


    moving() {
        if (keyIsDown(65) || keyIsDown(37)) { // tecla A or left arrow
            //this.cam.move(this._space, 0, 0);
            this.panWorldWindow(0.1, 0)
        }
        if (keyIsDown(68) || keyIsDown(39))  // tecla D or right arrow
        {
            //this.cam.move(-this._space, 0, 0);
            this.panWorldWindow(-0.1, 0)
        }
        if (keyIsDown(87) || keyIsDown(38)) { // tecla W or up arrow   
            //this.cam.move(0, this._space, 0);
            this.panWorldWindow(0, -0.1)
        }
        if (keyIsDown(83) || keyIsDown(40)) // tecla S or down arrow
        {
            //this.cam.move(0, -this._space, 0);
            this.panWorldWindow(0, 0.1)
        }

    }

    scaleWorldWindow(_scaleFac) {
        var vpr          // viewport distortion ratio
        var cx, cy       // window center
        var sizex, sizey // window sizes
        var Lx, Ly

        //Compute canvas viewport ratio.
        vpr = height / width

        // Get current window center.    
        cx = (this._left + this._right) / 2.0
        cy = (this._bottom + this._top) / 2.0


        // Set new window sizes based on scaling factor.
        sizex = (this._left - this._right) * _scaleFac
        sizey = (this._top - this._bottom) * _scaleFac


        // Adjust window to keep the same aspect ratio of the viewport.
        if ((sizey / sizex) < vpr) {
            Ly = sizey
            Lx = Ly / vpr
        }
        else if ((sizey / sizex) > vpr) {
            Lx = sizex
            Ly = Lx * vpr
        }

        this._left = (cx - Lx / 2.0)
        this._right = (cx + Lx / 2.0)

        this._bottom = (cy - Ly / 2.0)
        this._top = (cy + Ly / 2.0)

        // Establish the clipping volume by setting up an
        // orthographic projection
        this.camera()
        redraw()
    }

    fitWorldToViewport(_scaleFac) {
        let bounding = this.model.getBoundBox(this._left, this._right, this._bottom, this._top)
        this.setOrthoValues(bounding)       
        this.scaleWorldWindow(_scaleFac)
    }

    scrollDrawing(_scroll) {
        _scale = _scale + _scroll
        if (_scale > 0) {
            this._left = -width / _scale
            this._right = width / _scale
            this._bottom = -height / _scale
            this._top = height / _scale
        }
        else {
            _scale = abs(_scroll)
        }

        redraw()
    }
    

    useLoop() {
        if (buleanLoop == false) {
            buleanLoop = true
            buttonLoop.html('noLoop')
            angle = 0
            this.x = (height / 2) / (PI / 6) * sin(angle)
            this.z = (height / 2) / (PI / 6) * cos(angle)
            loop()
        } else {
            buleanLoop = false
            buttonLoop.html('Loop')
            angle = 0
            this.x = (height / 2) / (PI / 6) * sin(angle)
            this.z = (height / 2) / (PI / 6) * cos(angle)
            noLoop()
            redraw()
        }
    }

    //make the model rotate around y axis
    animateModel() {
        if (buleanLoop) {
            this.x = (height / 2) / (PI / 6) * sin(this.angle)
            this.z = (height / 2) / (PI / 6) * cos(this.angle)
            this.angle += 0.01
            this.moving()
        }
    }
}