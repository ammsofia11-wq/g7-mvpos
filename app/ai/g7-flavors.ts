export type FlavorKey =
  | "mexican"
  | "asian"
  | "italian"
  | "indian"

type FlavorSystem = {
  name: string
  sauce: string
  seasoning: string
  style: string
}

export const G7_FLAVORS: Record<FlavorKey, FlavorSystem> = {

  mexican: {
    name: "Mexican",
    sauce: "Hot Salsa",
    seasoning: "Cumin & Chili",
    style: "bold spicy street-style"
  },

  asian: {
    name: "Asian",
    sauce: "Soy-Ginger Sauce",
    seasoning: "Sesame & Garlic",
    style: "umami-rich wok style"
  },

  italian: {
    name: "Italian",
    sauce: "Tomato Basil Sauce",
    seasoning: "Herb Mix",
    style: "fresh herb Mediterranean style"
  },

  indian: {
    name: "Indian",
    sauce: "Curry Sauce",
    seasoning: "Garam Masala",
    style: "deep aromatic spice style"
  }

}