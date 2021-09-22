import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INotes, NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: NotesService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.noteId = navigation?.extras?.state?.noteId;
  }
  noteId: string;
  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    _id: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (typeof this.noteId === 'undefined') {
      this.router.navigate(['']);
    } else {
      const findNote = this.service.notes.find(
        (item) => item._id === this.noteId
      );
      if (findNote) {
        this.noteForm.patchValue(findNote);
      } else {
        this.router.navigate(['']);
      }
    }
  }

  onEdit() {
    this.service.handleEdit(this.noteForm.value)
  }
}
