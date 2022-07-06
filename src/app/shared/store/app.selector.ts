import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Appstate } from "./appstate";


export const selectAppState = createFeatureSelector<Appstate>('myappstate');
