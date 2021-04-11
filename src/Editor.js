import React from 'react';
import './App.css';

export class Editor extends React.Component
{
  constructor( props )
  {
    super( props );
    this.state =
    {
      initialized : false,
      corner : 'bl', /* bl, tl, tr, br */
      corners : [],
      states :
      [
        // initial state of the room, this points will have handlers for adding angles and cutouts
        [
          { x: 1000 * 0.05, y: 1000 * 0.95 },
          { x: 1000 * 0.05, y: 1000 * 0.05 },
          { x: 1000 * 0.95, y: 1000 * 0.05 },
          { x: 1000 * 0.95, y: 1000 * 0.95 }
        ],
      ],
      action : 'no', /* triag, square, cut */
      actions : [],
      isReceivedWidth : false,
      isReceivedDepth : false,
      width : 1000, /* svg viewport max width */
      depth : 1000, /* svg viewport max height */
      roomCoordinates :
      // { x: 50, y: 1000 },
      //   { x: 50, y: 50 },
      //   { x: 1000, y: 50 },
      //   { x: 1000, y: 1000 },
      [
        // use width and depth
        // only points with order properties can be dragged
        { x: 1000 * 0.05, y: 1000 * 0.95 },
        { x: 1000 * 0.05, y: 1000 * 0.05 },
        { x: 1000 * 0.95, y: 1000 * 0.05 },
        { x: 1000 * 0.95, y: 1000 * 0.95 },
      ]
    };

    this.handleChangeWidth = this.handleChangeWidth.bind( this );
    this.handleSubmitWidth = this.handleSubmitWidth.bind( this );

    this.handleChangeDepth = this.handleChangeDepth.bind( this );
    this.handleSubmitDepth = this.handleSubmitDepth.bind( this );

    this.addTrianularCorner = this.addTrianularCorner.bind( this );
    this.addSquareCorner = this.addSquareCorner.bind( this );
    this.addCutoutCorner = this.addCutoutCorner.bind( this );

    this.handleChangeCorner = this.handleChangeCorner.bind( this );
    this.handleSubmitCorner = this.handleSubmitCorner.bind( this );

    this.calculateNewCoordinates = this.calculateNewCoordinates.bind( this );

  }

  calculateNewCoordinates( state )
  {
    return (
      [
        { x: state.width * 0.05, y: state.depth * 0.95, order : 0 },
        { x: state.width * 0.05, y: state.depth * 0.05, order : 1 },
        { x: state.width * 0.95, y: state.depth * 0.05, order : 2 },
        { x: state.width * 0.95, y: state.depth * 0.95, order : 3 },
      ]
    )
  }

  render()
  {

    // push current state to the states array

    debugger
    // const points = this.state.states[ 0 ];
    const points = this.state.roomCoordinates;
    const width = this.state.width;
    const depth = this.state.depth;
    // `${points[ 0 ].x},${points[ 0 ].y} ${points[ 1 ].x},${points[ 1 ].y} ${points[ 2 ].x},${points[ 2 ].y} ${points[ 3 ].x},${points[ 3 ].y}`
    let pointsStr = points.map( ( el ) => `${el.x},${el.y}` ).join( ' ' );
    console.log( pointsStr );
    console.log( this.state );
    // console.log( this.state.roomCoordinates.toString() === this.state.states[ 0 ].toString() );

    /* Buttons */

    let addTrianular = (
      <button id="triangle-button" onClick={this.addTrianularCorner}>
        <b>Add triangular corner</b>
        <svg width="200" height="100" className="triangle-icon" viewBox="0 0 200 100" role="img">
          <polygon
            fill="white"
            stroke="grey"
            strokeWidth="3"
            points="10,90 10,40 40,20 180,20 180,90"
            />
        </svg>
      </button>
    )

    // let addSquare;
    // if( this.state.action === 'square' )
    // {
      let addSquare = (
        <button id="triangle-button" onClick={this.addSquareCorner}>
          <b>Add square corner</b>
          <svg width="200" height="100" className="triangle-icon" viewBox="0 0 200 100" role="img">
            <polygon
              fill="white"
              stroke="grey"
              strokeWidth="3"
              points="10,90 10,50 40,50 40,20 180,20 180,90"
              />
          </svg>
        </button>
      )

    // }

    let addCutout = (
      <button id="triangle-button" onClick={this.addCutoutCorner}>
        <b>Add cut-out</b>
        <svg width="200" height="100" className="triangle-icon" viewBox="0 0 200 100" role="img">
          <polygon
            fill="white"
            stroke="grey"
            strokeWidth="3"
            points="10,90 10,50 10,20 40,20 180,20 180,90 60,90 60,50 40,50 40,90"
            />
        </svg>
      </button>
    )

    let pick = (
      <form onSubmit={this.handleSubmitCorner}>
        <label>
          Pick the corner to change :
          <select value={this.state.corner} onChange={this.handleChangeCorner}>
            <option value="bl">Bottom-left corner</option>
            <option value="tl">Top-left corner</option>
            <option value="tr">Top-right corner</option>
            <option value="br">Bottom-right corner</option>
          </select>
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
      // {/* <div>Please pick a {this.state.action === 'square' || this.state.action === 'triag' ? 'corner' : 'wall' }</div> */}
    )

    /* */
    
    let prevCoordinate = points[ 0 ];
    // let prevCoordinate2 = points[ 0 ];
    let form, changeWidth, changeDepth, displayButtons, pickCorner, dots;

    // if( !this.state.isReceivedWidth )
    // {
      changeWidth = (
        <form onSubmit={this.handleSubmitWidth}>
          <label>
            Please enter the room width:
            <input id="width" type="text" value={this.state.width} onChange={this.handleChangeWidth} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    // }
    // else if( !this.state.isReceivedDepth )
    // {
      changeDepth = (
        <form onSubmit={this.handleSubmitDepth}>
          <label>
            Please enter the room depth:
            <input id="depth" type="text" value={this.state.depth} onChange={this.handleChangeDepth} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    // }
    // else if( this.state.isReceivedWidth && this.state.isReceivedDepth )
    // {
      // display the menu
      displayButtons = (
        <div>
          {addTrianular}
          {addSquare}
          {addCutout}
        </div>
      )

      if( this.state.action !== 'no' )
      pickCorner = (
        <div>
          {pick}
        </div>
      )

    // }

    // { x: 50, y: 1000 }, left bottom
    // { x: 50, y: 50 }, left top
    // { x: 1000, y: 50 }, right top
    // { x: 1000, y: 1000 }, right bottom

    // let lines = points.map( ( el, i ) =>
    // {
    //   let current;
    //   if( i > 0 )
    //   {
    //     // current = <line x1={prevCoordinate2.x - 40} y1={prevCoordinate2.y} x2={ el.x-40 } y2={el.y} stroke="red" strokeWidth="4" />;
    //     // current = <rect x={ ( prevCoordinate.x + el.x ) / 2 - 25 } y={( prevCoordinate.y + el.y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
    //     prevCoordinate2=el;
    //     return current;
    //   }
    //   else
    //   {
    //     // return <line x1={prevCoordinate2.x - 40} y1={prevCoordinate2.y - 40} x2={ el.x-40 } y2={el.y - 40} stroke="red" strokeWidth="4" />;
    //     // return <rect x={ ( points[ 0 ].x + points[ points.length - 1 ].x ) / 2 - 25 } y={( points[ 0 ].y + points[ points.length - 1 ].y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
    //   }
    // })
    // console.log( lines )
    // let line = <line x1="50" y1="20" x2="1000" y2="20" stroke="darkgrey" strokeWidth="4" />;

    if( this.state.action === 'triag' )
    {
      dots = points.map( ( el, i ) => {
        // return <rect x={ el.x - 20 } y={ el.y - 20 } width="40" height="40" rx="45" fill="grey"/>;
        return <rect x={ el.x - ( width * 0.04 / 2 ) } y={ el.y - ( width * 0.04 / 2 ) } width={ Math.min( width, depth ) * 0.04 } height={ Math.min( width, depth ) * 0.04 } rx="45" fill="grey"/>;
      });
      // console.log( dots )
    }
    else if( this.state.action === 'square' )
    {
      dots = points.map( ( el, i ) =>
      {
        return <rect x={ el.x - ( width * 0.04 / 2 ) } y={ el.y - ( width * 0.04 / 2 ) } width={ Math.min( width, depth ) * 0.04 } height={ Math.min( width, depth ) * 0.04 } fill="grey" onMouseDown={ ( e ) => this.dragSquareCorner( e, i, this.svgPolygon ) } />;
      });
    }
    else if( this.state.action === 'cut' )
    {
      dots = points.map( ( el, i ) => {
        let current;
        if( i > 0 )
        {
          // current = <rect x={ ( prevCoordinate.x + el.x ) / 2 - 25 } y={( prevCoordinate.y + el.y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
          current = <rect x={ ( prevCoordinate.x + el.x ) / 2 - ( width * 0.04 / 2 ) } y={( prevCoordinate.y + el.y ) / 2 - ( width * 0.04 / 2 ) } width={ Math.min( width, depth ) * 0.04 } height={ Math.min( width, depth ) * 0.04 } rx="15" fill="grey"/>;
          prevCoordinate=el;
          return current;
        }
        else
        {
          // return <rect x={ ( points[ 0 ].x + points[ points.length - 1 ].x ) / 2 - 25 } y={( points[ 0 ].y + points[ points.length - 1 ].y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
          return <rect x={ ( points[ 0 ].x + points[ points.length - 1 ].x ) / 2 - ( width * 0.04 / 2 ) } y={( points[ 0 ].y + points[ points.length - 1 ].y ) / 2 - ( width * 0.04 / 2 ) } width={ Math.min( width, depth ) * 0.04 } height={ Math.min( width, depth ) * 0.04 } rx="15" fill="grey"/>;
        }
      })
    }
    
    let states = (
      <div width="50px"> States : {JSON.stringify( this.state.states )} </div>
    )

    return (
      <div className='editor'>
        <div className='interface'>
        { changeWidth }
        { changeDepth }
        { displayButtons }
        { pickCorner }
        {/* { states } */}
        </div>
        <svg width="100%" viewBox={`0 0 ${this.state.width} ${this.state.depth}`} ref={(svg) => this.svg = svg}>
          {/* { line } */}
          <polygon
          fill="white"
          stroke="grey"
          strokeWidth={ Math.min( this.state.width, this.state.depth ) * 0.004 }
          points={pointsStr}
          ref={(e) => this.svgPolygon = e}
          // onMouseDown={(e) => this.drag(e, this.svgPolygon)}
          />
          { dots }
        </svg>
      </div>
    );
  }

  handleChangeCorner( event )
  {
    event.preventDefault();
    this.setState({ corner : event.target.value });
  }

  handleSubmitCorner( event )
  {
    event.preventDefault();
  }

  /* */

  addTrianularCorner( event )
  {
    event.preventDefault();
    this.setState({ action : 'triag' });
  }

  addSquareCorner( event )
  {
    event.preventDefault();
    this.setState({ action : 'square' });
  }

  addCutoutCorner( event )
  {
    event.preventDefault();
    this.setState({ action : 'cut' });
  }

  /* */

  handleChangeWidth( event )
  {
    this.setState({ width : +event.target.value });
  }

  handleSubmitWidth( event )
  {
    // clear form field after it has been submitted
    event.preventDefault();
    this.setState( ( state ) => ( { isReceivedWidth: true, roomCoordinates : this.calculateNewCoordinates( state ), states : [ this.calculateNewCoordinates( state ) ] } ) );
    // console.log( this.state );
  }

  /* */

  handleChangeDepth( event )
  {
    this.setState({ depth : +event.target.value });
  }

  handleSubmitDepth( event )
  {
    // clear form field after it has been submitted
    event.preventDefault();
    this.setState( ( state ) => ( { isReceivedDepth: true, roomCoordinates : this.calculateNewCoordinates( state ), states : [ this.calculateNewCoordinates( state ) ] } ) );
    // console.log( this.state );
  }

  // roomCoordinates :
  // [
  //   { x: 50, y: 1000 },
  //   { x: 50, y: 50 },
  //   { x: 1000, y: 50 },
  //   { x: 1000, y: 1000 },
  // ]

  /* */

  dragSquareCorner( event, index, draggedElem )
  {
    debugger
    event.preventDefault();
    let point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform( this.svg.getScreenCTM().inverse() );
    // this.setState({
    //   dragOffset:
    //   {
    //     x: point.x - this.state.roomCoordinates[ 1 ].x,
    //     y: point.y - this.state.roomCoordinates[ 1 ].y
    //   }
    // });

    const mousemove = ( event ) =>
    {
      // let coordinates = { roomCoordinates : [] };
      event.preventDefault();
      console.log( 'event', event )
      point.x = event.clientX;
      point.y = event.clientY;
      let cursor = point.matrixTransform( this.svg.getScreenCTM().inverse() );
      this.setState( ( state ) =>
      {

        let coordinates = state.roomCoordinates.slice();

        // let point_x = Math.max( Math.min( cursor.x, state.width ), 0 ) - this.state.dragOffset.x;
        // let point_y = Math.max( Math.min( cursor.y, state.width ), 0 ) - this.state.dragOffset.y;
        // let point_x = cursor.x - this.state.dragOffset.x;
        // let point_y = cursor.y - this.state.dragOffset.y;

        let point_x = Math.max( Math.min( cursor.x, this.state.width * 0.95 ), this.state.width * 0.05 );
        let point_y = Math.max( Math.min( cursor.y, this.state.depth * 0.95 ), this.state.width * 0.05 );

        /*
          roles : bl, tl, tr, br;
        */

        // if( index === 1 )
        if( this.state.corner === 'tl' )
        {
          /* left top corner */
          // coordinates.splice
          // (
          //   index,
          //   0,
          //   {
          //     x: state.roomCoordinates[ 0 ].x,
          //     y: point_y,
          //   },
          //   {
          //     x : point_x,
          //     y : point_y
          //   },
          //   {
          //     x : point_x,
          //     y : state.roomCoordinates[ state.roomCoordinates.length - 2 ].y
          //   }  
          // )
          // console.log( 'coord', coordinates );
          // return { roomCoordinates : coordinates };
          return {
            roomCoordinates:
            [
              state.roomCoordinates[ 0 ],
              {
                x: state.roomCoordinates[ 0 ].x,
                y: point_y,
              },
              {
                x : point_x,
                y : point_y
              },
              {
                x : point_x,
                y : state.roomCoordinates[ state.roomCoordinates.length - 2 ].y
              },
              state.roomCoordinates[ state.roomCoordinates.length - 2 ],
              state.roomCoordinates[ state.roomCoordinates.length - 1 ],
            ]
          };
        }
        else if( this.state.corner === 'tr' )
        {
          // top right corner
          return {
            roomCoordinates:
            [
              state.roomCoordinates[ 0 ],
              state.roomCoordinates[ 1 ],
              {
                x: point_x,
                y: state.roomCoordinates[ 1 ].y,
              },
              {
                x : point_x,
                y : point_y
              },
              {
                x : state.roomCoordinates[ state.roomCoordinates.length - 1 ].x,
                y : point_y
              },
              state.roomCoordinates[ state.roomCoordinates.length - 1 ],
            ]
          };
        }
        else if( this.state.corner === 'br' )
        {
          // bottom right corner
          return {
            roomCoordinates:
            [
              state.roomCoordinates[ 0 ],
              state.roomCoordinates[ 1 ],
              state.roomCoordinates[ 2 ],
              {
                x: state.roomCoordinates[ 2 ].x,
                y: point_y,
              },
              {
                x : point_x,
                y : point_y
              },
              {
                x : point_x,
                y : state.roomCoordinates[ state.roomCoordinates.length - 1 ].y
              },
            ]
          };
        }
        else if( this.state.corner === 'bl' )
        {
          // bottom left corner
          return {
            roomCoordinates:
            [
              {
                x: point_x,
                y: state.roomCoordinates[ state.roomCoordinates.length - 1 ].y,
              },
              {
                x : point_x,
                y : point_y
              },
              {
                x: state.roomCoordinates[ state.roomCoordinates.length - 3 ].x,
                y: point_y,
              },
              state.roomCoordinates[ state.roomCoordinates.length - 3 ],
              state.roomCoordinates[ state.roomCoordinates.length - 2 ],
              state.roomCoordinates[ state.roomCoordinates.length - 1 ],
            ]
          };
        }

      });
    };
    
    const mouseup = ( event ) =>
    {
      this.setState( ( state ) =>
      {
        return { states : [ ... state.states, state.roomCoordinates ] }
      })
      document.removeEventListener( 'mousemove', mousemove );
      document.removeEventListener( 'mouseup', mouseup );
    };
    
    document.addEventListener( 'mousemove', mousemove );
    document.addEventListener( 'mouseup', mouseup );
  }

  /* */

  // drag(event, draggedElem)
  // {
  //   event.preventDefault();
  //   let point = this.svg.createSVGPoint();
  //   point.x = event.clientX;
  //   point.y = event.clientY;
  //   point = point.matrixTransform(this.svg.getScreenCTM().inverse());
  //   this.setState({
  //     dragOffset:
  //     {
  //       x: point.x - this.state.roomCoordinates[ 0 ].x,
  //       y: point.y - this.state.roomCoordinates[ 0 ].y
  //     }
  //   });
    
  //   const mousemove = (event) =>
  //   {
  //     event.preventDefault();
  //     point.x = event.clientX;
  //     point.y = event.clientY;
  //     let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
  //     this.setState( ( state ) =>
  //     ({
  //       roomCoordinates:
  //       [
  //         {
  //           // x : cursor.x - this.state.dragOffset.x,
  //           // y : cursor.y - this.state.dragOffset.y
  //           x : Math.max( Math.min( cursor.x, state.width ), 0 ) - this.state.dragOffset.x,
  //           y : Math.max( Math.min( cursor.y, state.depth ), 0 ) - this.state.dragOffset.y
  //         },
  //         { x: state.roomCoordinates[ 1 ].x, y: state.roomCoordinates[ 1 ].y },
  //         { x: state.roomCoordinates[ 2 ].x, y: state.roomCoordinates[ 2 ].y },
  //         { x: state.roomCoordinates[ 3 ].x, y: state.roomCoordinates[ 3 ].y },
  //       ]
  //     }));
  //   };
    
  //   const mouseup = (event) => {
  //     document.removeEventListener( 'mousemove', mousemove );
  //     document.removeEventListener( 'mouseup', mouseup );
  //   };
    
  //   document.addEventListener( 'mousemove', mousemove );
  //   document.addEventListener( 'mouseup', mouseup );
  // }

}

class Sample extends React.Component {
  constructor() {
    super();
    this.state = {points: [
      {x: 30, y: 900},
      {x: 30, y: 30},
      {x: 900, y: 30},
      {x: 900, y: 900},
    ]};
  }
  
  render() {
    const points = this.state.points;
    return (
      <svg viewBox="0 0 1000 1000" ref={(svg) => this.svg = svg}>
        <path
          d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`}
          fill="transparent"
          stroke="blue"
          strokeWidth="3"
        />
        <path
          d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} M ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`}
          fill="transparent"
          stroke="gray"
          strokeWidth="2"
        />
        {
          points.map((point, i) => (
            <g transform="translate(-15, -15)">
              <rect
                x={point.x}
                y={point.y}
                key={i}
                width="30"
                height="30"
                onMouseDown={(e) => this.startDrag(e, i)}
              />
            </g>
          ))
        }
      </svg>
    );
  }
  
  startDrag = ( event, index ) =>
  {
    event.preventDefault();
    
    const mousemove = (event) => {
      event.preventDefault();
      let cursorPoint = this.svg.createSVGPoint();
      cursorPoint.x = event.clientX;
      cursorPoint.y = event.clientY;
      cursorPoint = cursorPoint.matrixTransform(this.svg.getScreenCTM().inverse());
      this.setState({
        points: this.state.points.map(
          (p, i) => (index === i ? {
            x: Math.max(Math.min(cursorPoint.x, 1000), 0),
            y: Math.max(Math.min(cursorPoint.y, 1000), 0)
          } : p))
      })
    };
    
    const mouseup = ( event ) => {
      document.removeEventListener( 'mousemove', mousemove);
      document.removeEventListener( 'mouseup', mouseup);
    };
    
    document.addEventListener( 'mousemove', mousemove);
    document.addEventListener( 'mouseup', mouseup);
  };
}




///////////////////////////////////////////////////////



// export class Editor extends React.Component {
//   constructor() {
//     super();
//     this.state = {points: [
//       {x: 30, y: 900},
//       {x: 30, y: 30},
//       {x: 900, y: 30},
//       {x: 900, y: 900},
//     ]};
//   }
  
//   render() {
//     const points = this.state.points;
//     return (
//       // <div className='editor'>
//         <svg viewBox="0 0 3000 3000" ref={( svg ) => this.svg = svg}>
//         {console.log( this )}
//           <path
//             d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`}
//             fill="transparent"
//             stroke="blue"
//             strokeWidth="3"
//           />
//           <path
//             d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} M ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`}
//             fill="transparent"
//             stroke="gray"
//             strokeWidth="2"
//           />
//           {
//             points.map((point, i) => (
//               <g transform="translate(-15, -15)">
//                 <rect
//                   x={point.x}
//                   y={point.y}
//                   key={i}
//                   width="30"
//                   height="30"
//                   onMouseDown={(e) => this.startDrag(e, i)}
//                 />
//               </g>
//             ))
//           }
//         </svg>
//       // </div>
//     );

    
//   }
  
//   startDrag = (event, index) => {
//     event.preventDefault();
    
//     const mousemove = (event) => {
//       event.preventDefault();
//       let cursorPoint = this.svg.createSVGPoint();
//       cursorPoint.x = event.clientX;
//       cursorPoint.y = event.clientY;
//       cursorPoint = cursorPoint.matrixTransform(this.svg.getScreenCTM().inverse());
//       this.setState({
//         points: this.state.points.map(
//           (p, i) => (index === i ? {
//             x: Math.max(Math.min(cursorPoint.x, 1000), 0),
//             y: Math.max(Math.min(cursorPoint.y, 1000), 0)
//           } : p))
//       })
//     };
    
//     const mouseup = (event) => {
//       document.removeEventListener("mousemove", mousemove);
//       document.removeEventListener("mouseup", mouseup);
//     };
    
//     document.addEventListener("mousemove", mousemove);
//     document.addEventListener("mouseup", mouseup);
//   };
// }


// {/* Dots on lines */}
// {
//   points.map( ( el, i ) => {
//     let current;
//     if( i > 0 )
//     {
//       current = <rect x={ ( prevCoordinate.x + el.x ) / 2 - 25 } y={( prevCoordinate.y + el.y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
//       prevCoordinate=el;
//       return current;
//     }
//     else
//     {
//       console.log( '=0' )
//       return <rect x={ ( points[ 0 ].x + points[ points.length - 1 ].x ) / 2 - 25 } y={( points[ 0 ].y + points[ points.length - 1 ].y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
//     }
//   })
// }

// {/* Angles */}
// {
//   points.map( ( el, i ) => {
//     return <rect x={ el.x - 20 } y={ el.y - 20 } width="40" height="40" rx="45" fill="grey"/>;
//   })
// }