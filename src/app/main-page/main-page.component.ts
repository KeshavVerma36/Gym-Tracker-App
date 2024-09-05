import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from '../exercise.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  title = 'timer';
  sec: number = 0;
  min: number = 3;
  startTimer: any;
  running = false;

  exercises: any[] = [];
  newExercise: any = { name: '', sets: [{ weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }] };
  routine: string = '';
  editIndex: number | null = null;
  editExercise: any = { name: '', sets: [{ weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }] };

  constructor(private route: ActivatedRoute, private exercisesService: ExercisesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.routine = params.get('routine') || '';
      this.loadExercises();
    });
  }

  ngOnDestroy() {
    this.stop(); // Ensure the interval is cleared when the component is destroyed
  }

  loadExercises() {
    this.exercises = this.exercisesService.getExercises(this.routine).map(exercise => ({
      ...exercise,
      expanded: false // Initialize with all panels collapsed
    }));
  }

  addExercise() {
    if (this.newExercise.name.trim()) {
      this.exercisesService.addExercise(this.routine, this.newExercise);
      this.newExercise = { name: '', sets: [{ weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }] };
      this.loadExercises();
    }
  }

  deleteExercise(index: number) {
    this.exercisesService.deleteExercise(this.routine, index);
    this.loadExercises();
  }

  startEditing(index: number) {
    this.editIndex = index;
    this.editExercise = { ...this.exercises[index] };
    this.exercises[index].expanded = true; // Expand the panel when editing
  }

  saveEdit(index: number) {
    if (this.editExercise.name.trim()) {
      this.exercisesService.updateExercise(this.routine, index, this.editExercise);
      this.editIndex = null;
      this.editExercise = { name: '', sets: [{ weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }] };
      this.exercises[index].expanded = false; // Collapse the panel after saving
      this.loadExercises();
    }
  }

  updateEditExerciseName(newName: string) {
    this.editExercise.name = newName;
  }

  saveSetsAndReps(exerciseIndex: number, setIndex: number, property: 'weight' | 'reps', event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;

    if (this.exercises[exerciseIndex] && this.exercises[exerciseIndex].sets[setIndex]) {
      this.exercises[exerciseIndex].sets[setIndex][property] = value;

      // Update the local storage
      this.exercisesService.updateExercise(this.routine, exerciseIndex, this.exercises[exerciseIndex]);
    }
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.runTimer();
      }, 1000);
    } else {
      this.stop();
    }
  }

  runTimer(): void {
    if (this.sec === 0) {
      if (this.min === 0) {
        this.reset(); // Stop the timer when it reaches zero
      } else {
        this.min--;
        this.sec = 59;
      }
    } else {
      this.sec--;
    }
  }

  stop(): void {
    clearInterval(this.startTimer);
    this.running = false;
  }

  reset(): void {
    this.stop();
    this.min = 3; // Reset to 3 minutes
    this.sec = 0; // Reset seconds to 0
  }
}
