import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface INotes {
  title: string;
  description: string;
  _id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: INotes[] = [];

  constructor(private http: HttpClient, private router:Router) {}

  getNotes() {
    return this.http.get<INotes[]>('http://localhost:3001/api/notes');
  }

  handleAdd(note: INotes) {
    this.notes = [...this.notes, note];
  }

  handleDelete(item: INotes) {
    this.http
      .delete(`http://localhost:3001/api/notes?noteId=${item._id}`)
      .subscribe((res) => {
        this.notes = this.notes.filter((item) => item._id !== item._id);
      });
  }

  handleEdit(item: INotes) {
    const noteCopy = [...this.notes];
    this.http
      .put(`http://localhost:3001/api/notes?noteId=${item._id}`, item)
      .subscribe(
        (res) => {
          if (res === 'Updated success') {
            noteCopy.map((note) => {
              if (note._id === item._id) {
                note.description = item.description;
                note.title = item.title;
              }
              return note;
            });
            this.router.navigate([''])
          }
        },
        (err) => {
          console.log(err);
        }
      );

    this.notes = noteCopy;
  }
}
