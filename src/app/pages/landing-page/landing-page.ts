import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Header } from "../../shared/header/header";

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, Header],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage {

}
