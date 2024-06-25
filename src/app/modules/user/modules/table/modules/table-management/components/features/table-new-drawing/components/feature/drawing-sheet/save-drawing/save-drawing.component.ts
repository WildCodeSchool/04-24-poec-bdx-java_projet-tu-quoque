import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { DrawingService } from '../../../../../../../../../../../../shared/services/drawing/drawing.service';
import { Observable, Subscription, filter, finalize, lastValueFrom } from 'rxjs';
import { DrawingDTO } from '../../../../../../../../../../../../shared/models/types/users/drawing-dto';
import { UserInfos } from '../../../../../../../../../../../../shared/models/types/users/user-infos';
import { UploadFileService } from '../../../../../../../../../../../../shared/services/uploadFile/upload-file.service';
import { UploadToFirebaseService } from '../../../../../../../../../../../../shared/services/uploadFile/upload-to-firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-save-drawing',
  templateUrl: './save-drawing.component.html',
  styleUrl: './save-drawing.component.scss',
  providers: [MessageService]
})
export class SaveDrawingComponent implements OnInit {
  @Input() canvasRef!: ElementRef<HTMLCanvasElement>;
  tableId!: number;

  downloadIcon: string = 'assets/icons/drawTools/download.svg';
  selectedFile: File | null = null;
  private _subscription!: Subscription;
  private _uploadSubscription!: Subscription;
  userTableList$: Observable<DrawingDTO> | null = null;
  user: UserInfos | null = null;
  private _messageService = inject(MessageService);

  constructor(
    private _drawingService: DrawingService,
    private _uploadFileService: UploadFileService,
    private _uploadToFirebaseService: UploadToFirebaseService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tableId = this._route.snapshot.params['id'];
    const userData = this._route.snapshot.data['user'];
    this.user = userData;

    this._subscription = this._uploadFileService.selectedFile$.subscribe(file => {
      this.selectedFile = file;
    });

    this._uploadSubscription = this._uploadToFirebaseService.downloadURL$
      .pipe(
        filter(url => !!url)
      ).subscribe(url => {
        console.log("OMG URL", url);

        this.saveDrawing(url);
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

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const fileName = `dessin_${formattedDate}.png`;

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

  async saveDrawing(url: string | null): Promise<void> {
    if (!this.tableId) {
      console.error('tableId is undefined, cannot save drawing.');
      return;
    }

    if (!url) {
      console.error('URL is null or undefined, cannot save drawing.');
      return;
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const name = `dessin_${formattedDate}.png`;

    try {
      const response = await lastValueFrom(this._drawingService.postDrawing(name, url, this.tableId));
      this._messageService.add({ severity: 'info', summary: 'Enregistré', detail: `Image sauvegardée` });
    } catch (error) {
      console.error('Error posting drawing:', error);
      console.error('Error details:', {
        name,
        url,
        tableId: this.tableId
      });
    }
  }
}