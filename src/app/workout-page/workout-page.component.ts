import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesService } from '../exercise.service'; // Ensure correct path to your service

@Component({
  selector: 'app-workout-page',
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.scss']
})


export class WorkoutPageComponent implements OnInit {

  routines: string[] = [];
  newRoutine: string = '';
  editIndex: number | null = null;
  editRoutineName: string = '';

  constructor(private router: Router, private exercisesService: ExercisesService) { }

  ngOnInit() {
    this.routines = this.exercisesService.getRoutines();
  }

  navigateToExercises(routine: string) {
    this.router.navigate(['/exercises', routine]);
  }

  addRoutine() {
    const trimmedRoutine = this.newRoutine.trim();
    if (trimmedRoutine && !this.routines.includes(trimmedRoutine)) {
      this.exercisesService.addRoutine(trimmedRoutine);
      this.routines = this.exercisesService.getRoutines(); // Refresh routines list
      this.newRoutine = '';
    }
  }

  startEditing(index: number, routine: string) {
    this.editIndex = index;
    this.editRoutineName = routine;
  }

  saveEdit(index: number) {
    const trimmedRoutine = this.editRoutineName.trim();
    if (trimmedRoutine && !this.routines.includes(trimmedRoutine)) {
      this.exercisesService.updateRoutine(this.routines[index], trimmedRoutine);
      this.routines[index] = trimmedRoutine;
      this.editIndex = null;
      this.editRoutineName = '';
    }
  }

  deleteRoutine(index: number) {
    const routine = this.routines[index];
    this.exercisesService.deleteRoutine(routine);
    this.routines.splice(index, 1);
  }
}
