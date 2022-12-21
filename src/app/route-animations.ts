import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from "@angular/animations";

export const slider = trigger("routeAnimations", [
  transition("* => isLeft", slideTo("left")),
  transition("* => isRight", slideTo("right")),
  transition("isLeft => *", slideTo("right")),
  transition("isRight => *", slideTo("left")),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          [direction]: 0,
          width: "100%",
        }),
      ],
      optional
    ),
    query(":enter", [
      style({
        [direction]: "-100%",
      }),
    ]),
    group([
      query(
        ":leave",
        [animate("600ms ease", style({ [direction]: "100%" }))],
        optional
      ),
      query(":enter", [animate("600ms ease", style({ [direction]: "0%" }))]),
    ]),
  ];
}
