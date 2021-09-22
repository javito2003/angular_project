import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NotesService, INotes } from '../../../services/notes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      noteId: '',
    },
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public service: NotesService,
    private http: HttpClient
  ) {}
  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }



  onSave(): void {
    const note: INotes = this.noteForm.value;
    if (note.description.trim() || note.title.trim()) {
      const toSend: INotes = {
        title: note.title,
        description: note.description,
      };
      this.http
        .post<{ status: string; noteId: string }>(
          'http://localhost:3001/api/notes',
          toSend
        )
        .subscribe(
          (res) => {
            toSend._id = res.noteId;
            this.service.handleAdd(toSend);
            this.noteForm.reset();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  onEdit(id: string): void {
    this.navigationExtras.state!.noteId = id;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onDelete(note: INotes): void {
    this.service.handleDelete(note);
  }
}
