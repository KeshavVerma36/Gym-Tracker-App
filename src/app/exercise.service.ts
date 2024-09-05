import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private storageKey = 'workoutData';

  private defaultExercisesData = {
    "Chest Tricep": [
      {
        "name": "Chest Press",
        "sets": [
          { "weight": null, "reps": null },
          { "weight": null, "reps": null },
          { "weight": null, "reps": null },
          { "weight": null, "reps": null }
        ]
      }
    ]
  };

  private exercises: { [routine: string]: any[] } = this.loadExercises();

  constructor() { }

  getExercises(routine: string): any[] {
    return this.exercises[routine] || [];
  }

  addExercise(routine: string, exercise: any) {
    if (exercise.name.trim()) {
      if (!this.exercises[routine]) {
        this.exercises[routine] = [];
      }
      this.exercises[routine].push({
        name: exercise.name.trim(),
        sets: exercise.sets || [{ weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }]
      });
      this.saveExercises();
    }
  }

  updateExercise(routine: string, index: number, newExercise: any) {
    if (this.exercises[routine] && index >= 0 && index < this.exercises[routine].length) {
      this.exercises[routine][index] = {
        name: newExercise.name.trim(),
        sets: newExercise.sets || [{ weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }, { weight: null, reps: null }]
      };
      this.saveExercises();
    }
  }

  deleteExercise(routine: string, index: number) {
    if (this.exercises[routine] && index >= 0 && index < this.exercises[routine].length) {
      this.exercises[routine].splice(index, 1);
      this.saveExercises();
    }
  }

  addRoutine(routine: string) {
    if (routine.trim() && !this.exercises[routine]) {
      this.exercises[routine] = [];
      this.saveExercises();
    }
  }

  updateRoutine(oldRoutine: string, newRoutine: string) {
    if (newRoutine.trim() && oldRoutine !== newRoutine) {
      this.exercises[newRoutine] = this.exercises[oldRoutine];
      delete this.exercises[oldRoutine];
      this.saveExercises();
    }
  }

  deleteRoutine(routine: string) {
    if (this.exercises[routine]) {
      delete this.exercises[routine];
      this.saveExercises();
    }
  }

  private saveExercises() {
    console.log('Saving exercises:', this.exercises);
    localStorage.setItem(this.storageKey, JSON.stringify(this.exercises));
  }

  private loadExercises(): { [routine: string]: any[] } {
    const storedData = localStorage.getItem(this.storageKey);
    console.log('Loaded exercises:', storedData);
    return storedData ? JSON.parse(storedData) : this.defaultExercisesData;
  }

  getRoutines(): string[] {
    return Object.keys(this.exercises);
  }
}
