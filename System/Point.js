class _point {
    constructor(number) {
        this.m_nPts = 0;
        this.m_x1
        this.m_y1
        this.number = number
        this.currentCurve = false
        this.selected = false

        //tolerancia do bounding box
        this.tol = 0.2
        this.isPossibleToSelect = false

        //Support        
        this.suport = []
        this.typeSuportToDraw  //mudificado 3

        //drawing flags
        this.drawSupport = false
        this.suportType
        this.drawForce = false
        this.force = []
    }

    //-------------------------------------------------------------------------
    _Point(_x1, _y1) {
        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_nPts = 1;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    addPoint(_x, _y) {
        if (this.m_nPts == 0) {
            this.m_x1 = _x;
            this.m_y1 = _y;
            this.m_nPts++;
        }
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getPoint( _t )
    {
     let vx = m_x2 - m_x1;
     let vy = m_y2 - m_y1;
     let xOn, yOn;
     if( _t < 0 )
     {
      xOn = m_x1;
      yOn = m_y1;
     }
     else if( _t > 1 )
     {
      xOn = m_x2;
      yOn = m_y2;
     }
     else
     {
      xOn = m_x1 + _t * vx;
      yOn = m_y1 + _t * vy;
     }
     return Point(xOn, yOn);
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    isPossible(){
        if (this.m_nPts < 1) {
            return false;
        }
        return true;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getPoints()
    {
     if( m_nPts == 1 )
     {
     vector<Point> tempPts( 1 );
     tempPts[0] = Point( m_x1, m_y1 );
     return tempPts;
     }
     vector<Point> tempPts( 2 );
     tempPts[0] = Point( m_x1, m_y1 );
     tempPts[1] = Point( m_x2, m_y2 );
     return tempPts;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getPointsToDraw()
    {
     vector<Point> tempPts( 2 );
     tempPts[0] = Point( m_x1, m_y1 );
     tempPts[1] = Point( m_x2, m_y2 );
     return tempPts;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    drawCurve() {
        beginShape(POINTS);
        vertex(this.m_x1, -this.m_y1)
        endShape();
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPointsToDraw(_x, _y) {
        var tempPts = Array(2)
        tempPts[0] = (createVector(this.m_x1, this.m_y1));
        return tempPts;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* closestPoint( * _x, * _y )
    {
        let vx = m_x2 - m_x1;
        let vy = m_y2 - m_y1;
        let t = (vx*(*_x-m_x1) + vy*(*_y-m_y1)) / (vx*vx + vy*vy);
        let xOn, yOn;
     if( t < 0.0 )
     {
      xOn = m_x1;
      yOn = m_y1;
     }
     else if( t > 1.0 )
     {
      xOn = m_x2;
      yOn = m_y2;
     }
     else
     {
      xOn = m_x1 + t * vx;
      yOn = m_y1 + t * vy;
     }
     let  dist = sqrt((xOn-*_x)*(xOn-*_x)+(yOn-*_y)*(yOn-*_y));
     *_x = xOn;
     *_y = yOn;
     return dist;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------

    getBoundBox(x, y)
    {
        this.isPossibleToSelect = false

        var xmin = this.m_x1 - this.tol
        var xmax = this.m_x1 + this.tol
        var ymin = -(-this.m_y1 + this.tol)
        var ymax = -(-this.m_y1 - this.tol) 
   

        if(x > xmin && x < xmax){
            if(y > ymin && y < ymax){
                this.isPossibleToSelect = true                                
            }
        }
    } 

    /* getBoundBox( * _xmin, * _xmax,
                       * _ymin, * _ymax )
    {
     *_xmin = (m_x1 < m_x2) ? m_x1 : m_x2;
     *_xmax = (m_x1 > m_x2) ? m_x1 : m_x2;
     *_ymin = (m_y1 < m_y2) ? m_y1 : m_y2;
     *_ymax = (m_y1 > m_y2) ? m_y1 : m_y2;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    setPoints(_x1, _y1) {
        this.m_x1 = _x1;
        this.m_x2 = _x2;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPoints() {
        let m_points = []
        m_points.push(createVector(this.m_x1, this.m_y1))

        return m_points
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    isSelected() {
        if(this.selected){
            return true
        }else{
            return false
        }
    }
    //-------------------------------------------------------------------------

}

