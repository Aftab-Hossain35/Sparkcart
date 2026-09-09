// Central place for category -> color mapping.
// Add a key here whenever a new category shows up in your catalog —
// both ProductCard and the home-page category sections read from this.
export const CATEGORY_STYLES = {
  electronics: {
    grad: "from-indigo-500 to-cyan-400",
    chip: "bg-indigo-50 text-indigo-600",
    text: "text-indigo-600",
  },
  "fashion and fashion accessories": {
    grad: "from-fuchsia-500 to-pink-400",
    chip: "bg-fuchsia-50 text-fuchsia-600",
    text: "text-fuchsia-600",
  },
  fashion: {
    grad: "from-fuchsia-500 to-pink-400",
    chip: "bg-fuchsia-50 text-fuchsia-600",
    text: "text-fuchsia-600",
  },
  "grocery household food & pets": {
    grad: "from-emerald-500 to-lime-400",
    chip: "bg-emerald-50 text-emerald-600",
    text: "text-emerald-600",
  },
  groceries: {
    grad: "from-emerald-500 to-lime-400",
    chip: "bg-emerald-50 text-emerald-600",
    text: "text-emerald-600",
  },
  food: {
    grad: "from-orange-500 to-amber-400",
    chip: "bg-orange-50 text-orange-600",
    text: "text-orange-600",
  },
  "baby products": {
    grad: "from-pink-500 to-rose-400",
    chip: "bg-pink-50 text-pink-600",
    text: "text-pink-600",
  },
  babycare: {
    grad: "from-pink-500 to-rose-400",
    chip: "bg-pink-50 text-pink-600",
    text: "text-pink-600",
  },
  default: {
    grad: "from-violet-500 to-fuchsia-400",
    chip: "bg-violet-50 text-violet-600",
    text: "text-violet-600",
  },
};

export const getCategoryStyle = (category) =>
  CATEGORY_STYLES[category?.toLowerCase()?.trim()] || CATEGORY_STYLES.default;

// Turns "Grocery Household Food & Pets" into a URL-safe slug for filter links.
export const slugifyCategory = (category) =>
  (category || "").toLowerCase().trim().replace(/[&]/g, "and").replace(/\s+/g, "-");
