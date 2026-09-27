/* ==========================================================================
   WooCommerce projects
   --------------------------------------------------------------------------
   Short format — one line per store:
     [ "website url", "Store name", "industry key", "One-line summary", "Location" ]

   Industry keys are listed in projects.js → industries.
   To add a store: copy a line and edit it. Duplicates are skipped automatically.
   ========================================================================== */
(() => {
  const stores = [
    // Crafts & Art
    ["https://brushandpencil.com/", "Brush & Pencil", "crafts", "Art supplies and drawing & painting resources.", "USA"],
    ["https://flwr.co.nz/", "FLWR", "crafts", "Small floral studio with online flower orders.", "New Zealand"],
    ["https://www.stemsbrooklyn.com/", "Stems Brooklyn", "crafts", "Mixed garden bouquets and wedding florals.", "Brooklyn, USA"],
    ["https://millionairegallery.com/", "Millionaire Gallery", "art", "Unique art display and artwork store.", "USA"],
    ["https://rosielou.com.au/", "Rosie Lou", "crafts", "Eco-friendly stationery.", "Australia"],

    // Food, Drink & Coffee
    ["https://www.brownbrothers.com.au/", "Brown Brothers", "food", "Wine and food & drink store.", "Australia"],
    ["https://www.nordicware.com.au/", "Nordic Ware Australia", "food", "Bakeware and kitchen products.", "Australia"],
    ["https://joecoffeecompany.com/", "Joe Coffee Company", "coffee", "Specialty coffee roaster and online store.", "USA"],
    ["https://jococups.com/", "JOCO Cups", "coffee", "Coffee cups store.", ""],
    ["https://www.dripp.com/", "Dripp", "coffee", "Coffee store with WooCommerce implementation.", ""],
    ["https://home.lamarzoccousa.com/", "La Marzocco Home", "coffee", "Home espresso machines and accessories.", "USA"],
    ["https://thecoffeepressco.com/", "The Coffee Press Co.", "coffee", "Coffee products store.", ""],

    // Electronics
    ["https://nordicappeal.com/", "Nordic Appeal", "electronics", "Computer and phone accessories.", "Denmark"],
    ["https://www.vilros.com/", "Vilros", "electronics", "Computer kits with premium components.", "USA"],

    // Home, Garden & Decor
    ["https://gilmour.com/", "Gilmour", "home", "Watering and cleaning products for home & garden.", "USA"],
    ["https://www.luminaire.com/", "Luminaire", "home", "Furniture, accessories and design objects.", "USA"],
    ["https://dinesen.com/", "Dinesen", "home", "Wooden plank flooring company.", "Denmark"],
    ["https://bloomscape.com/", "Bloomscape", "home", "Houseplants delivered to your door.", "Detroit, USA"],

    // Beauty
    ["https://nuriabeauty.com/", "Nuria Beauty", "beauty", "Beauty and skincare products.", "USA"],
    ["https://gooddyeyoung.com/", "Good Dye Young", "beauty", "Hair colour brand.", "USA"],
    ["https://generationclay.com/", "Generation Clay", "beauty", "Clay-based skincare.", "Australia"],
    ["https://bybexter.se/", "By Bexter", "beauty", "Eyelash extension products.", "Sweden"],

    // Fashion
    ["https://cbeaux.com/", "Cbeaux", "fashion", "European mainstream fashion store.", "USA"],
    ["https://britishknights.com/", "British Knights", "fashion", "Sneakers and footwear.", "New York, USA"],
    ["https://mytshirtzone.com/", "My T-Shirt Zone", "fashion", "Custom printed apparel and accessories.", "Winchester, VA, USA"],

    // Jewelry
    ["https://jidiamonds.com/", "JI Diamonds", "jewelry", "Jewellery manufacturer.", "UK"],
    ["https://www.antiquejewellerycompany.com/", "The Antique Jewellery Company", "jewelry", "Antique jewellery trade.", "London, UK"],
    ["https://www.newtwist.com/", "New Twist", "jewelry", "Hand-crafted designer jewelry and artisan gifts.", "USA"],

    // Automotive
    ["https://car2go-biludlejning.dk/", "Car2Go Biludlejning", "automotive", "Car rental website.", "Denmark"],
    ["https://www.suttontools.com.au/", "Sutton Tools", "automotive", "Cutting tools and car products.", "Australia"],
    ["https://raybuck.com/", "Raybuck Auto Body Parts", "automotive", "Auto parts store.", "Pittsburgh, USA"],

    // Pets
    ["https://www.2houndsdesign.com/", "2 Hounds Design", "pets", "Dog collars and leashes.", "Indian Trail, USA"],
    ["https://woofandwiggle.com/", "Woof & Wiggle", "pets", "Unique apparel and accessories for dogs.", "Germany"],

    // Retail
    ["https://www.queasy.in/", "Queasy", "retail", "Apparel, dry fruits, beauty & grooming shop.", "India"],
    ["https://www.turkeymerck.com/", "Turkey Merck", "retail", "Spooky ceramic coffee mugs.", ""],

    // Sports
    ["https://www.essexcricketshop.co.uk/", "Essex Cricket Shop", "sports", "Cricket equipment and accessories.", "Essex, UK"],
    ["https://usnagolf.com/", "USNA Golf", "sports", "Golf course website with online shop.", "Maryland, USA"],
    ["https://gaestetraener.dk/", "Gæstetræner", "sports", "Handball club website.", "Denmark"],

    // Kids & Babies
    ["https://boboandboo.com.au/", "Bobo & Boo", "toys", "Dinnerware for kids.", "Australia"],
    ["https://bluehousejoys.com/", "Blue House Joys", "toys", "Handmade reading nooks.", ""],
    ["https://www.minilearners.com/", "Mini Learners", "toys", "Home and nursery decor brand.", ""],

    // Health
    ["https://www.sproutliving.com/", "Sprout Living", "health", "Plant-based protein powders and functional foods.", "USA"],
    ["https://kellylynch.online/", "Kelly Lynch", "health", "Clean and healthy lifestyle store.", ""]
  ];

  const norm = (u) => u.replace(/^http:/, "https:").replace("://www.", "://").replace(/\/$/, "");
  const slug = (url) => "woo-" + new URL(url).hostname.replace(/^www\.|^home\./, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const seen = new Set(window.PORTFOLIO.projects.map((p) => norm(p.url)));

  stores.forEach(([url, name, industry, summary, location]) => {
    if (seen.has(norm(url))) return; // skip duplicates
    seen.add(norm(url));
    window.PORTFOLIO.projects.push({
      id: slug(url),
      name,
      url,
      summary,
      description: `${summary} Online store built with WordPress and WooCommerce.`,
      type: "WooCommerce store",
      tags: ["wordpress", "woocommerce", "ecommerce"],
      industry,
      tech: ["WordPress", "WooCommerce"],
      features: ["Product catalogue & categories", "Cart and checkout", "Payment & shipping setup", "Responsive store design"],
      location: location || "—"
    });
  });
})();
