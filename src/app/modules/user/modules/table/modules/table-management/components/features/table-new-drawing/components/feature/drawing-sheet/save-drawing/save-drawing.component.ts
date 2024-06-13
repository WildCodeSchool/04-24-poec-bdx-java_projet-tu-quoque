import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DrawingService } from '../../../../../../../../../../../../shared/services/drawing/drawing.service';
import { Observable, Subscription, filter, finalize } from 'rxjs';
import { DrawingDTO } from '../../../../../../../../../../../../shared/models/types/users/drawing-dto';
import { UserInfos } from '../../../../../../../../../../../../shared/models/types/users/user-infos';
import { UploadFileService } from '../../../../../../../../../../../../shared/services/uploadFile/upload-file.service';
import { UploadToFirebaseService } from '../../../../../../../../../../../../shared/services/uploadFile/upload-to-firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-save-drawing',
  templateUrl: './save-drawing.component.html',
  styleUrl: './save-drawing.component.scss'
})
export class SaveDrawingComponent implements OnInit {
  @Input() canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() tableId!: number;

  downloadIcon:string = 'assets/icons/drawTools/download.svg';
  selectedFile: File | null = null;
  private _subscription!: Subscription;
  private _uploadSubscription!: Subscription;
  userTableList$: Observable<DrawingDTO> | null = null;
  user: UserInfos | null = null;

  constructor(
    private _drawingService: DrawingService,
    private _uploadFileService: UploadFileService,
    private _uploadToFirebaseService: UploadToFirebaseService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userData = this._route.snapshot.data['user'];
    this.user = userData;

    this._subscription = this._uploadFileService.selectedFile$.subscribe(file => {
      this.selectedFile = file;
    });

    this._uploadSubscription = this._uploadToFirebaseService.downloadURL$
      .pipe(
        filter(url => !!url),
        finalize(() => {
          console.log('Upload process finished');
        })
      ).subscribe(url => {
        console.log('File uploaded to:', url);
        this.saveDrawing();
      });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._uploadSubscription) {
      this._uploadSubscription.unsubscribe();
    }
  }


  selectFile(): void {
    const canvas = this.canvasRef.nativeElement;
    
    const timestamp = new Date().getTime();
    const fileName = `drawing_${timestamp}.png`;

    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], fileName, { type: 'image/png' });
        this._uploadFileService.setSelectedFile(file);

        this._uploadToFirebaseService.uploadFile(file);
      } else {
        console.error('Failed to create Blob from canvas');
      }
    }, 'image/png');
  }

  saveDrawing(): void {
    const canvas = this.canvasRef.nativeElement;

    this._drawingService.postDrawing(canvas, this.tableId).subscribe({
      next: (response) => console.log(response),
      error: (error: any) => console.error(error)
    });
  }
}