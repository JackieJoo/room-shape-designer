import React from 'react';
import './App.css';

export class Editor extends React.Component {
  constructor( props ) {
    super( props );
    this.state =
    {
      states : [],
      action : 'no', /* tr, sq, cut */
      isReceivedWidth : false,
      isReceivedDepth : false,
      scale : 10, /* normalize user input to always display same rectangle */
      lineLength :
      {

      },
      range : [ 0, 1000 ], /* svg viewport range */
      roomCoordinates :
      [
        { x: this.state.range[ 1 ] * 1.05, y: this.state.range[ 1 ] },
        { x: this.state.range[ 1 ] * 1.05, y: this.state.range[ 1 ] * 1.05 },
        { x: this.state.range[ 1 ], y: this.state.range[ 1 ] * 1.05 },
        { x: this.state.range[ 1 ], y: this.state.range[ 1 ] },
      ]
    };

    this.handleChangeWidth = this.handleChangeWidth.bind(this);
    this.handleSubmitWidth = this.handleSubmitWidth.bind(this);

    this.handleChangeDepth = this.handleChangeDepth.bind(this);
    this.handleSubmitDepth = this.handleSubmitDepth.bind(this);

    this.addTrianularCorner = this.addTrianularCorner.bind(this);
    this.addSquareCorner = this.addSquareCorner.bind(this);
    this.addCutout = this.addCutout.bind(this);

    this.drag = this.drag.bind(this);
  }
  
  render() {
    const points = this.state.roomCoordinates;
    // `${points[ 0 ].x},${points[ 0 ].y} ${points[ 1 ].x},${points[ 1 ].y} ${points[ 2 ].x},${points[ 2 ].y} ${points[ 3 ].x},${points[ 3 ].y}`
    let pointsStr = points.map( ( el ) => `${el.x},${el.y}` ).join( ' ' );
    console.log( pointsStr );

    /* Buttons */

    let addTrianular = (
      <button id="triangle-button" onClick={this.addTrianularCorner}>
        <b>Add triangular corner</b>
        <svg width="200" height="100" class="triangle-icon" viewBox="0 0 200 100" role="img">
          <polygon
            fill="white"
            stroke="grey"
            strokeWidth="3"
            points="10,90 10,40 40,20 180,20 180,90"
            />
        </svg>
      </button>
    )

    let addSquare = (
      <button id="triangle-button" onClick={this.addSquareCorner}>
        <b>Add square corner</b>
        <svg width="200" height="100" class="triangle-icon" viewBox="0 0 200 100" role="img">
          <polygon
            fill="white"
            stroke="grey"
            strokeWidth="3"
            points="10,90 10,50 40,50 40,20 180,20 180,90"
            />
        </svg>
      </button>
    )

    let addCutout = (
      <button id="triangle-button" onClick={this.addCutout}>
        <b>Add cut-out</b>
        <svg width="200" height="100" class="triangle-icon" viewBox="0 0 200 100" role="img">
          <polygon
            fill="white"
            stroke="grey"
            strokeWidth="3"
            points="10,90 10,50 10,20 40,20 180,20 180,90 60,90 60,50 40,50 40,90"
            />
        </svg>
      </button>
    )

    /* */
    
    let prevCoordinate = points[ 0 ];
    let prevCoordinate2 = points[ 0 ];
    let form, dots;

    // if( !this.state.isReceivedWidth )
    // {
    //   form = (
    //     <form onSubmit={this.handleSubmitWidth}>
    //       <label>
    //         Please enter the room width:
    //         <input id="width" type="text" value={this.state.value} onChange={this.handleChangeWidth} />
    //       </label>
    //       <input type="submit" value="Submit" />
    //     </form>
    //   );
    // }
    // else if( !this.state.isReceivedDepth )
    // {
    //   form = (
    //     <form onSubmit={this.handleSubmitDepth}>
    //       <label>
    //         Please enter the room depth:
    //         <input id="depth" type="text" value={this.state.value} onChange={this.handleChangeDepth} />
    //       </label>
    //       <input type="submit" value="Submit" />
    //     </form>
    //   );
    // }
    // else if( this.state.isReceivedWidth && this.state.isReceivedDepth )
    // {
      // display the menu
      form = (
        <div>
          {addTrianular}
          {addSquare}
          {addCutout}
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
    let line = <line x1="50" y1="20" x2="1000" y2="20" stroke="darkgrey" strokeWidth="4" />;

    if( this.state.action === 'triag' || this.state.action === 'square' )
    {
      dots = points.map( ( el, i ) => {
        return <rect x={ el.x - 20 } y={ el.y - 20 } width="40" height="40" rx="45" fill="grey"/>;
      });
    }
    else if( this.state.action === 'cut' )
    {
      dots = points.map( ( el, i ) => {
        let current;
        if( i > 0 )
        {
          current = <rect x={ ( prevCoordinate.x + el.x ) / 2 - 25 } y={( prevCoordinate.y + el.y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
          prevCoordinate=el;
          return current;
        }
        else
        {
          return <rect x={ ( points[ 0 ].x + points[ points.length - 1 ].x ) / 2 - 25 } y={( points[ 0 ].y + points[ points.length - 1 ].y ) / 2 - 25 } width="50" height="50" rx="15" fill="grey"/>;
        }
      })
    }

    return (
      <div className='editor'>
        <div className='interface'>
        {form}
        </div>
        <svg width="80%" viewBox="0 0 1050 1050" ref={(svg) => this.svg = svg}>
          { line }
          {/* { lines } */}
          <polygon
          fill="white"
          stroke="grey"
          strokeWidth="4"
          points={pointsStr}
          ref={(e) => this.svgPolygon = e}
          onMouseDown={(e) => this.drag(e, this.svgPolygon)}
          />
          { dots }
        </svg>
      </div>
    );
  }

  addTrianularCorner( event )
  {
    event.preventDefault();
    this.setState({ action : 'triag' });
    console.log( this.state.action )
  }

  addSquareCorner( event )
  {
    event.preventDefault();
    this.setState({ action : 'square' });
    console.log( this.state.action )
  }

  addCutout( event )
  {
    event.preventDefault();
    this.setState({ action : 'cut' });
    console.log( this.state.action )
  }

  /* */

  handleChangeWidth( event )
  {
    this.setState({ width: event.target.value });
  }

  handleSubmitWidth( event )
  {
    // clear form field after it has been submitted
    event.preventDefault();
    this.setState({ isReceivedWidth: true });
    console.log( this.state );
  }

  handleChangeDepth( event )
  {
    this.setState({ height: event.target.value });
  }

  handleSubmitDepth( event )
  {
    // clear form field after it has been submitted
    event.preventDefault();
    this.setState({ isReceivedDepth: true });
    console.log( this.state );
  }

  // roomCoordinates :
  // [
  //   { x: 50, y: 1000 },
  //   { x: 50, y: 50 },
  //   { x: 1000, y: 50 },
  //   { x: 1000, y: 1000 },
  // ]

  drag(event, draggedElem) {
    event.preventDefault();
    let point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(this.svg.getScreenCTM().inverse());
    this.setState({
      dragOffset:
      {
        x: point.x - this.state.roomCoordinates[ 0 ].x,
        y: point.y - this.state.roomCoordinates[ 0 ].y
      }
    });
    
    const mousemove = (event) => {
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;
      let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
      this.setState({
        roomCoordinates:
        [
          {
            x : cursor.x - this.state.dragOffset.x,
            y : cursor.y - this.state.dragOffset.y
          },
          { x: 50, y: 50 },
          { x: 1000, y: 50 },
          { x: 1000, y: 1000 },
        ]
      });
    };
    
    const mouseup = (event) => {
      document.removeEventListener( 'mousemove', mousemove );
      document.removeEventListener( 'mouseup', mouseup );
    };
    
    document.addEventListener( 'mousemove', mousemove );
    document.addEventListener( 'mouseup', mouseup );
  }

}





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