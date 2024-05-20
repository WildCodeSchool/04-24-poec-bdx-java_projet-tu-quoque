// import { ElementRef } from "@angular/core";
// import { DrawingUtilitiesService } from "../../../../../../../../../../../../shared/services/drawing/drawing-utilities.service";
// import { ColorService } from "../../../../../../../../../../../../shared/services/drawing/color.service";
// import { map, switchMap, takeUntil } from "rxjs";

// export function drawFree(
//     canvasRef: ElementRef,
//     _drawingService: DrawingUtilitiesService,
//     _colorService: ColorService,
//     _ctx: CanvasRenderingContext2D,
//     width: number,
//     height: number,
//     _currentColor: string,
//     _currentLineWidth: number,
//     _drawnPaths: { color: string, lineWidth: number, path: {x: number, y: number}[] }[],
//     redrawAll: () => void
// ){
//     _drawingService.unsubscribeAllEvents();
//     const canvas = canvasRef.nativeElement;
      
//     const { start$, move$, end$ } = _drawingService.captureEvents(canvas);

//     const draw$ = start$
//     .pipe(
//       switchMap((startEvent: MouseEvent | TouchEvent) => {
//         let path: { x: number, y: number }[] = [];
//         const startPos = _drawingService.getCoordinates(canvas, startEvent);
//         path.push(startPos);

//         const moveSubscription = move$
//           .pipe(
//             map((moveEvent: MouseEvent | TouchEvent) => _drawingService.getCoordinates(canvas, moveEvent)),
//             takeUntil(end$)
//           )
//           .subscribe(currentPos => {
//             path.push(currentPos);
//             drawOnCanvas(path[path.length - 2], currentPos);
//           });

//         return end$.pipe(
//           map(() => {
//             _drawnPaths.push({
//               color: _currentColor,
//               lineWidth: _currentLineWidth,
//               path
//             });
//             moveSubscription.unsubscribe();
//           })
//         );
//       })
//     );

//   const drawSubscription = draw$.subscribe();
//   _drawingService.addSubscription(drawSubscription);

  
// }
