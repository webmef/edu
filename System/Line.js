
class _line {
    constructor(number) {
        this.m_nPts = 0;
        this.m_x1
        this.m_y1
        this.m_x2
        this.m_y2
        this.number = number
        this.currentCurve = false

        //selection
        this.isPossibleToSelect = false
        this.selected = false
        this.tol = 0.5

        //material e seção
        this.material = 0
        this.crossSection = 0 
    }

    //-------------------------------------------------------------------------
    _Line(_x1, _y1, _x2, _y2) {
        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_x2 = _x2;
        this.m_y2 = _y2;
        this.m_nPts = 2;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    addPoint(_x, _y) {
        if (this.m_nPts == 0) {
            this.m_x1 = _x;
            this.m_y1 = _y;
            this.m_nPts++;
        }
        else if (this.m_nPts == 1) {
            this.m_x2 = _x;
            this.m_y2 = _y;
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
    isPossible() {
        if (this.m_nPts < 2) {
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
        beginShape(LINES);
        vertex(this.m_x1, -this.m_y1)
        vertex(this.m_x2, -this.m_y2)
        endShape();
    }

    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPointsToDraw(_x, _y) {
        var tempPts = Array(2)
        tempPts[0] = (createVector(this.m_x1, this.m_y1));
        if (this.m_nPts == 2) {
            tempPts[1] = (createVector(this.m_x2, this.m_y2));
        }
        else if (this.m_nPts == 1) {
            tempPts[1] = (createVector(_x, _y));
        }

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

    getBoundBox(x, y) {
        this.isPossibleToSelect = false

        //Vetores
        var AB = []
        var AC = []
        AB.push(createVector(this.m_x2 - this.m_x1, this.m_y2 - this.m_y1))
        AC.push(createVector(x - this.m_x1, y - this.m_y1))
        

        var distAB2 = AB[0].x*AB[0].x + AB[0].y*AB[0].y 
        

        //produto interno para determinação do ponto C' até o segmento de reta. 
        var tc = ((AB[0].x * AC[0].x) + (AB[0].y * AC[0].y)) / distAB2
        
        if (tc < 0.05 || tc > 0.95) {
            return
        }
        
        //ponto que se encontra mais próximo da reta até a posição do cursor do mouse (valores paramétricos)
        var xc = this.m_x1 + tc * (this.m_x2 - this.m_x1)
        var yc = this.m_y1 + tc * (this.m_y2 - this.m_y1)
        
        //distancia do parametrizado até o cursor do mouse.
        var dist = math.sqrt((xc - x) * (xc - x) + (yc - y) * (yc - y))             

        if (dist < this.tol) {
            this.isPossibleToSelect = true           
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
    setPoints(_x1, _y1, _x2, _y2) {
        this.m_x1 = _x1;
        this.m_x2 = _x2;
        this.m_y1 = _y1;
        this.m_y2 = _y2;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPoints() {
        let m_points = []
        m_points.push(createVector(this.m_x1, this.m_y1))
        m_points.push(createVector(this.m_x2, this.m_y2))

        return m_points
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

