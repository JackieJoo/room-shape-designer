import React from 'react';
import './App.css';

export class Editor extends React.Component
{
  constructor( props )
  {
    super( props );
    this.state =
    {
      corner : 'bl', /* bl, tl, tr, br */
      corners : [],
      states :
      [
        // initial state of the room
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
      [
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

    const points = this.state.roomCoordinates;
    const width = this.state.width;
    const depth = this.state.depth;
    let pointsStr = points.map( ( el ) => el !== null ? `${el.x},${el.y}` : '' ).join( ' ' );
    console.log( pointsStr );
    console.log( this.state );

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
            <option disabled={this.state.corners.indexOf( 'bl' ) !== -1} value="bl">Bottom-left corner</option>
            <option disabled={this.state.corners.indexOf( 'tl' ) !== -1} value="tl">Top-left corner</option>
            <option disabled={this.state.corners.indexOf( 'tr' ) !== -1} value="tr">Top-right corner</option>
            <option disabled={this.state.corners.indexOf( 'br' ) !== -1} value="br">Bottom-right corner</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )

    /* */
    
    let prevCoordinate = points[ 0 ];
    let changeWidth, changeDepth, displayButtons, pickCorner, dots;

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

    if( this.state.action === 'triag' )
    {
      dots = points.map( ( el, i ) => {
        // return <rect x={ el.x - 20 } y={ el.y - 20 } width="40" height="40" rx="45" fill="grey"/>;
        return <rect x={ el.x - ( width * 0.04 / 2 ) } y={ el.y - ( width * 0.04 / 2 ) } width={ Math.min( width, depth ) * 0.04 } height={ Math.min( width, depth ) * 0.04 } rx="45" fill="grey"/>;
      });
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
          current = <rect x={ ( prevCoordinate.x + el.x ) / 2 - ( width * 0.04 / 2 ) } y={( prevCoordinate.y + el.y ) / 2 - ( width * 0.04 / 2 ) } width={ Math.min( width, depth ) * 0.04 } height={ Math.min( width, depth ) * 0.04 } rx="15" fill="grey"/>;
          prevCoordinate=el;
          return current;
        }
        else
        {
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
          <polygon
          fill="white"
          stroke="grey"
          strokeWidth={ Math.min( this.state.width, this.state.depth ) * 0.004 }
          points={pointsStr}
          ref={(e) => this.svgPolygon = e}
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
    this.setState( ( state ) =>
    {
      if( JSON.stringify( state.roomCoordinates ) === JSON.stringify( state.states[ state.states.length - 1 ] ) ) /* nothing changed */
      return state;
      else
      return {
        states : [ ...state.states, state.roomCoordinates ],
        actions : { ...state.actions, [ state.corner ] : state.action },
        corners : [ ...state.corners, state.corner ],
      }
    })
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
    event.preventDefault();
    this.setState( ( state ) => ( { isReceivedWidth: true, roomCoordinates : this.calculateNewCoordinates( state ), states : [ this.calculateNewCoordinates( state ) ] } ) );
  }

  /* */

  handleChangeDepth( event )
  {
    this.setState({ depth : +event.target.value });
  }

  handleSubmitDepth( event )
  {
    event.preventDefault();
    this.setState( ( state ) => ( { isReceivedDepth: true, roomCoordinates : this.calculateNewCoordinates( state ), states : [ this.calculateNewCoordinates( state ) ] } ) );
  }

  /* */

  dragSquareCorner( event, index, draggedElem )
  {
    event.preventDefault();
    let point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform( this.svg.getScreenCTM().inverse() );

    const mousemove = ( event ) =>
    {
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;
      let cursor = point.matrixTransform( this.svg.getScreenCTM().inverse() );

      this.setState( ( state ) =>
      {

        let point_x = Math.max( Math.min( cursor.x, this.state.width * 0.95 ), this.state.width * 0.05 );
        let point_y = Math.max( Math.min( cursor.y, this.state.depth * 0.95 ), this.state.width * 0.05 );

        /*
          roles : bl, tl, tr, br;
        */

        if( this.state.corner === 'tl' )
        {
          /* left top corner */
          return {
            // roomCoordinates: calculateLeftTopCornerSquare( state, point_x, point_y )
            roomCoordinates :
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
      document.removeEventListener( 'mousemove', mousemove );
      document.removeEventListener( 'mouseup', mouseup );
    };

    // function calculateLeftTopCornerSquare( state, point_x, point_y )
    // {
    //   if /* it's the first corner to be modified */
    //   (
    //     state.corners.length === 0
    //     || (
    //       state.corners.indexOf( 'tr' ) === -1
    //       && state.corners.indexOf( 'br' ) === -1 
    //       && state.corners.indexOf( 'bl' ) === -1
    //     )
    //   )
    //   {
    //     return [
    //       state.roomCoordinates[ 0 ],
    //       {
    //         x: state.roomCoordinates[ 0 ].x,
    //         y: point_y,
    //       },
    //       {
    //         x : point_x,
    //         y : point_y
    //       },
    //       {
    //         x : point_x,
    //         y : state.roomCoordinates[ state.roomCoordinates.length - 2 ].y
    //       },
    //       state.roomCoordinates[ state.roomCoordinates.length - 2 ],
    //       state.roomCoordinates[ state.roomCoordinates.length - 1 ],
    //     ]
    //   }
    //   else
    //   {
    //     let newLength = state.roomCoordinates.length;
    //     let result = [];
    //     let next = 0; /* element in the original array to take next */
    //     // let corners = Object.keys( state.actions );
    //     // let types = Object.values( state.actions );
    //     // state.actions.forEach( ( el, i, arr ) => /* max length = 4. For each corner */
    //     // {
    //     if( state.actions.bl === undefined )
    //     {
    //       result.push( state.roomCoordinates[ 0 ] );
    //       next = 1;
    //     }
    //     else if( state.actions.bl !== undefined )
    //     {
    //       if( state.actions.bl === 'square' )
    //       {
    //         result.push( state.roomCoordinates[ 0 ] );
    //         result.push( state.roomCoordinates[ 1 ] );
    //         result.push( state.roomCoordinates[ 2 ] );
    //         next = 3;
    //       }
    //       /* Implement triag and cutout */
    //       // return state.roomCoordinates;
    //     }

    //     result.push({ x: result[ result.length - 1 ].x, y: point_y });
    //     result.push({ x: point_x, y: point_y });
    //     result.push({ x: point_x, y: state.roomCoordinates[ next ].y });
    //     next++;

    //     // next += 2;

    //     if( state.actions.tr === undefined )
    //     {
    //       result.push( state.roomCoordinates[ next ] );
    //       next += 1;
    //     }
    //     else if( state.actions.tr !== undefined )
    //     {
    //       if( state.actions.tr === 'square' )
    //       {
    //         result.push( next++ );
    //         result.push( next++ );
    //         result.push( next++ );
    //         // result.push( state.roomCoordinates[ 1 ] );
    //         // result.push( state.roomCoordinates[ 2 ] );
    //         next = 3;
    //       }
    //       /* Implement triag and cutout */
    //       // return state.roomCoordinates;
    //     }

    //     if( state.actions.br === undefined )
    //     {
    //       // result.push({ x: point_x, y: state.roomCoordinates[ next ].y });
    //       result.push( state.roomCoordinates[ next ] );
    //       // next += 1;
    //     }
    //     else if( state.actions.br !== undefined )
    //     {
    //       if( state.actions.br === 'square' )
    //       {
    //         result.push( next++ );
    //         result.push( next++ );
    //         result.push( next++ );
    //         // result.push( state.roomCoordinates[ 1 ] );
    //         // result.push( state.roomCoordinates[ 2 ] );
    //         next = 3;
    //       }
    //       /* Implement triag and cutout */
    //       // return state.roomCoordinates;
    //     }

    //    return result;

    //     // return state.roomCoordinates
    //   }
    // }

    document.addEventListener( 'mousemove', mousemove );
    document.addEventListener( 'mouseup', mouseup );

  }
}

// class Sample extends React.Component {
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
//       <svg viewBox="0 0 1000 1000" ref={(svg) => this.svg = svg}>
//         <path
//           d={`M ${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`}
//           fill="transparent"
//           stroke="blue"
//           strokeWidth="3"
//         />
//         <path
//           d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} M ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y}`}
//           fill="transparent"
//           stroke="gray"
//           strokeWidth="2"
//         />
//         {
//           points.map((point, i) => (
//             <g transform="translate(-15, -15)">
//               <rect
//                 x={point.x}
//                 y={point.y}
//                 key={i}
//                 width="30"
//                 height="30"
//                 onMouseDown={(e) => this.startDrag(e, i)}
//               />
//             </g>
//           ))
//         }
//       </svg>
//     );
//   }
  
//   startDrag = ( event, index ) =>
//   {
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
    
//     const mouseup = ( event ) => {
//       document.removeEventListener( 'mousemove', mousemove);
//       document.removeEventListener( 'mouseup', mouseup);
//     };
    
//     document.addEventListener( 'mousemove', mousemove);
//     document.addEventListener( 'mouseup', mouseup);
//   };
// }
