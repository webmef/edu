
class _polyline {
    constructor(number) {
        this.m_nPts = 0;
        this.m_points = []
        this.tempPts = []
        this.number = number
        this.currentCurve = false
        this.selected = true
    }

    //-------------------------------------------------------------------------
    addPoint(_x, _y) {
        this.m_points.push(createVector(_x, _y))
        this.m_nPts++;
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
    isPossible() {
        if (this.currentCurve) {
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
    drawCurve() {

        beginShape();

        //if buttom is true, so the temporary polyline will be drawed in this part
        if (control.statusLineButton) {
            if (this.currentCurve) {
                if (this.tempPts.length > 0) {
                    for (var i = 0; i < this.m_points.length; i++) {
                        vertex(this.m_points[i].x, -this.m_points[i].y)
                    }
                    vertex(this.tempPts[0].x, -this.tempPts[0].y)
                }
            }
        }

        //if buttom is false, so the temporary polyline will be finished. So the real curve will be drawed in this part
        if (this.currentCurve == false) {
            if (this.m_points.length > 0) {
                for (var i = 0; i < this.m_points.length; i++) {
                    vertex(this.m_points[i].x, -this.m_points[i].y)
                }
            }
        }

        endShape();
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPointsToDraw(_x, _y) {
        this.tempPts = []
        this.tempPts.push((createVector(_x, _y)));
        return this.tempPts;
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
    setPoints() {
        this.m_points.push(createVector(this.tempPts[0].x, this.tempPts[0].y))
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPoints() {
        return this.m_points
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    isSelected() {
        if (this.selected) {
            return true
        } else {
            return false
        }
    }
    //-------------------------------------------------------------------------

}

