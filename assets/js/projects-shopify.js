/* ==========================================================================
   Shopify projects
   --------------------------------------------------------------------------
   Short format — one line per store:
     [ "website url", "Store name", "industry key", "One-line summary", "Location" ]

   Stores are grouped by the kind of work (PageFly home page, dropshipping
   store, one-product store, collection page, or a regular Shopify store).
   The group sets the project type, filter tabs and badges automatically.
   Industry keys are listed in projects.js → industries.

   To add a store: copy a line inside the right group and edit it.
   ========================================================================== */
(() => {
  const groups = [
    {
      type: "Shopify home page (PageFly)",
      tags: ["shopify", "ecommerce", "pagefly", "landing"],
      tech: ["Shopify", "PageFly"],
      features: ["Custom home page built with PageFly", "Mobile-first sections", "Conversion-focused layout", "Fast-loading product highlights"],
      stores: [
        ["https://saleshuntertheme.com/", "Sales Hunter Theme", "tech", "Demo store for the Sales Hunter Shopify theme."],
        ["https://rebelkin.com/", "Rebel Kin", "retail", "Custom Shopify home page for the Rebel Kin store."],
        ["https://brooklyncandlestudio.com/", "Brooklyn Candle Studio", "home", "Hand-poured candles and home fragrance from Brooklyn.", "New York, USA"],
        ["https://pawprintsby.com/", "Paw Prints By", "pets", "Custom Shopify home page for a pet-themed store."],
        ["https://gibsgrooming.com/", "Gibs Grooming", "beauty", "Hair and beard grooming products for men.", "USA"],
        ["https://calyanwaxco.com/", "Calyan Wax Co.", "home", "Candles and home fragrance.", "USA"],
        ["https://drink-mana.com/", "Mana", "food", "Complete-nutrition drinks and meal powders.", "Czech Republic"],
        ["https://shopinverse.com/", "Inverse", "retail", "Custom Shopify home page for the Inverse store."],
        ["https://www.klaiyihair.com/", "Klaiyi Hair", "beauty", "Human hair wigs and hair bundles."],
        ["https://www.lucyd.co/", "Lucyd", "electronics", "Bluetooth audio smart glasses and eyewear.", "USA"],
        ["https://betafpv.com/", "BETAFPV", "electronics", "FPV drones, radios and drone parts."],
        ["https://marksandangels.it/", "Marks & Angels", "fashion", "Italian fashion and knitwear brand.", "Italy"],
        ["https://www.dufranewatches.com/", "Dufrane Watches", "fashion", "Watches and accessories."],
        ["https://kitepride.com/", "Kite Pride", "retail", "Custom Shopify home page for the Kite Pride store."],
        ["https://www.vapoureyes.co.nz/", "Vapoureyes", "retail", "Vape devices and e-liquids retailer.", "New Zealand"],
        ["https://hstockton.com/", "H. Stockton", "fashion", "Custom Shopify home page for the H. Stockton store."],
        ["https://www.swaghairshop.com/", "Swag Hair Shop", "beauty", "Hair products and extensions store."]
      ]
    },
    {
      type: "Shopify dropshipping store",
      tags: ["shopify", "ecommerce", "dropship"],
      tech: ["Shopify", "Dropshipping"],
      features: ["Product catalogue & collections", "Supplier / fulfilment-friendly setup", "Checkout and cart optimisation", "Responsive store theme"],
      stores: [
        ["https://helmboots.com/", "Helm Boots", "fashion", "Handcrafted leather boots and shoes.", "Austin, USA"],
        ["https://kharakapas.com/", "Khara Kapas", "fashion", "Cotton fashion label for women.", "India"],
        ["https://www.toyshades.com/", "Toy Shades", "fashion", "Sunglasses and eyewear."],
        ["https://wpstandard.com/", "WP Standard", "fashion", "Leather bags and accessories.", "USA"],
        ["https://www.bremont.com/", "Bremont", "fashion", "British luxury watchmaker.", "UK"],
        ["https://nerdwax.com/", "Nerdwax", "retail", "Wax that stops glasses from slipping.", "USA"],
        ["https://kkwbeauty.com/", "KKW Beauty", "beauty", "Cosmetics and beauty products."],
        ["https://www.beardbrand.com/", "Beardbrand", "beauty", "Beard, hair and body grooming products.", "USA"],
        ["https://www.skinnymetea.com.au/", "SkinnyMe Tea", "food", "Detox teas and wellness drinks.", "Australia"],
        ["https://www.bootea.com/", "Bootea", "health", "Teas, shakes and health & fitness products.", "UK"],
        ["https://www.happinessabscissa.com/", "Happiness Abscissa", "beauty", "Beauty products store."],
        ["https://www.nutriseed.co.uk/", "Nutriseed", "health", "Superfoods and nutrition products.", "UK"],
        ["https://www.cookbookvillage.com/", "Cookbook Village", "crafts", "Online store for cookbooks."],
        ["https://www.masterdynamic.com/", "Master & Dynamic", "electronics", "Premium wireless headphones and earphones.", "USA"],
        ["https://stfrank.com/", "St. Frank", "home", "Artisan-made textiles and home decor.", "USA"],
        ["https://www.floorplanrugs.com/", "Floorplan Rugs", "home", "Rugs and floor decor."],
        ["https://wrightwoodfurniture.com/", "Wrightwood Furniture", "home", "Online furniture store.", "USA"],
        ["https://www.nickmayerart.com/", "Nick Mayer Art", "art", "Fish and wildlife art prints and originals.", "USA"],
        ["https://www.pipsnacks.com/", "Pip Snacks", "food", "Snack foods store.", "USA"],
        ["https://www.leatherheadsports.com/", "Leather Head Sports", "retail", "Handmade leather sports balls and gear.", "USA"],
        ["https://www.leifshop.com/", "Leif", "fashion", "Lifestyle, accessories and gift shop.", "USA"],
        ["https://ravenroxanne.com/", "Raven Roxanne", "art", "Artwork and prints store."]
      ]
    },
    {
      type: "One-product store",
      tags: ["shopify", "ecommerce", "oneproduct", "landing"],
      tech: ["Shopify", "Product page design"],
      features: ["Single-product sales page", "Benefit & social-proof sections", "Subscription / bundle options", "Streamlined checkout path"],
      stores: [
        ["https://lyfefuel.com/", "LyfeFuel", "health", "Plant-based nutrition shakes and supplements.", "USA"],
        ["https://www.topfoxx.com/", "TOPFOXX", "beauty", "Beauty brand with a focused product line."],
        ["https://mojemana.cz/", "Mana (CZ)", "food", "Czech store for Mana complete-nutrition drinks.", "Czech Republic"]
      ]
    },
    {
      type: "Collection page design",
      tags: ["shopify", "ecommerce", "collection"],
      tech: ["Shopify", "Collection pages"],
      features: ["Custom collection layouts", "Filtering & sorting", "Product grid design", "Mobile-friendly browsing"],
      stores: [
        ["https://dreizackjewelry.com/", "Dreizack Jewelry", "fashion", "Jewelry store with custom collection pages."],
        ["https://crumpler.eu/", "Crumpler EU", "fashion", "European store for Crumpler bags and backpacks.", "Europe"],
        ["https://alaskaguidecreations.com/", "Alaska Guide Creations", "retail", "Outdoor packs and gear.", "Alaska, USA"]
      ]
    },
    {
      type: "Shopify store",
      tags: ["shopify", "ecommerce"],
      tech: ["Shopify"],
      features: ["Store setup & theme customisation", "Product & collection pages", "Responsive design", "Checkout-ready catalogue"],
      stores: [
        // Pet
        ["https://kohepets.com.sg/", "Kohepets", "pets", "Online pet supplies store.", "Singapore"],
        ["https://zestypaws.com/", "Zesty Paws", "pets", "Supplements and health products for pets.", "USA"],
        ["https://magoloft.com/", "Magoloft", "pets", "Pet products store."],
        ["https://petland.ca/", "Petland Canada", "pets", "Pet stores and online pet supplies.", "Canada"],
        // Home & Decor
        ["https://www.denydesigns.com/", "Deny Designs", "home", "Artist-designed home decor.", "USA"],
        ["https://commondeer.com/", "Common Deer", "home", "Design-led home goods and gifts.", "Canada"],
        ["https://furbishstudio.com/", "Furbish Studio", "home", "Colourful home decor and gifts.", "USA"],
        ["https://sistergolden.com/", "Sister Golden", "home", "Boutique for clothing, home and gifts.", "USA"],
        // Crafts & Books
        ["https://shop.uppercasemagazine.com/", "UPPERCASE Shop", "crafts", "Store for the UPPERCASE creativity and craft magazine.", "Canada"],
        ["https://www.sarahandabraham.com/", "Sarah & Abraham", "crafts", "Crafts and books store."],
        ["https://www.thelacmastore.org/", "The LACMA Store", "art", "Museum store of the Los Angeles County Museum of Art.", "Los Angeles, USA"],
        // Fashion & Accessories
        ["https://www.greats.com/", "Greats", "fashion", "Sneakers and footwear.", "USA"],
        ["https://www.taylorstitch.com/", "Taylor Stitch", "fashion", "Menswear and responsibly made clothing.", "USA"],
        ["https://rodengray.com/", "Roden Gray", "fashion", "Menswear boutique.", "Vancouver, Canada"],
        ["https://www.3sixteen.com/", "3sixteen", "fashion", "Denim and menswear.", "USA"],
        ["https://matadorup.com/", "Matador", "fashion", "Packable travel bags and gear.", "USA"],
        ["https://jackiesmith.com/", "Jackie Smith", "fashion", "Leather handbags and accessories.", "Argentina"],
        // Food & Drink
        ["https://informaltea.co.nz/", "Informal Tea", "food", "Loose-leaf tea store.", "New Zealand"],
        ["https://www.mouth.com/", "Mouth", "food", "Indie food and drink gifts.", "USA"],
        ["https://www.withlovefrombrooklyn.com/", "With Love From Brooklyn", "food", "Baked goods and treats.", "New York, USA"],
        ["https://ambrosiamag.com/", "Ambrosia", "food", "Food and drink magazine store."],
        ["https://fancysip.com/", "Fancy Sip", "food", "Food and drink store."],
        ["https://www.peakchocolate.com.au/", "Peak Chocolate", "food", "Chocolate store.", "Australia"],
        ["https://www.thepinkpigboutique.com/", "The Pink Pig Boutique", "food", "Food and drink boutique store."],
        ["https://www.athleticperformancesociety.com/", "Athletic Performance Society", "food", "Food and drink store."],
        // Electronics
        ["https://getdubs.com/", "Dubs", "electronics", "Acoustic filter earplugs.", "USA"],
        ["https://www.dodocase.com/", "DODOcase", "electronics", "Handcrafted cases for tablets and e-readers.", "USA"],
        ["https://www.quadlockcase.com/", "Quad Lock", "electronics", "Phone mounts and cases.", "Australia"],
        ["https://www.gunitbrands.com/", "G-Unit Brands", "electronics", "Electronics store."],
        ["https://www.studioneat.com/", "Studio Neat", "electronics", "Design-led products and accessories.", "USA"],
        ["https://store.clearpathrobotics.com/", "Clearpath Robotics Store", "electronics", "Online store for Clearpath Robotics.", "Canada"],
        // Artwork
        ["https://tattly.com/", "Tattly", "art", "Designer temporary tattoos.", "USA"],
        ["https://spoke-art.com/", "Spoke Art", "art", "Art gallery store for prints and originals.", "San Francisco, USA"],
        ["https://popchart.co/", "Pop Chart", "art", "Infographic posters and prints.", "USA"],
        ["https://www.chalkd.co.nz/", "Chalkd", "art", "Artwork and prints store.", "New Zealand"],
        ["https://artzila.com/", "Artzila", "art", "Art prints store."],
        ["https://veryonbrand.com/", "Very On Brand", "art", "Artwork store."],
        ["https://www.fiercelycurious.com/", "Fiercely Curious", "art", "Art prints and paper goods."],
        // Merchandise
        ["https://store.lollapalooza.com/", "Lollapalooza Store", "merch", "Official merchandise for the Lollapalooza festival.", "USA"],
        ["https://shop.theoatmeal.com/", "The Oatmeal Shop", "merch", "Comics, games and merchandise from The Oatmeal.", "USA"],
        ["https://store.penny-arcade.com/", "Penny Arcade Store", "merch", "Merchandise for the Penny Arcade webcomic.", "USA"],
        ["https://ghostly.com/", "Ghostly International", "merch", "Record label store for music and merchandise.", "USA"],
        ["https://lakersstore.com/", "Lakers Store", "merch", "Official Los Angeles Lakers merchandise.", "Los Angeles, USA"],
        ["https://shop.wwf.ca/", "WWF-Canada Shop", "merch", "Merchandise store supporting WWF-Canada.", "Canada"],
        ["https://wutangclan.com/", "Wu-Tang Clan", "merch", "Official Wu-Tang Clan merchandise.", "USA"],
        // Clothing & Fashion
        ["https://girlsclubdjs.com/", "Girls Club DJs", "fashion", "Clothing and merchandise store."],
        ["https://arrowandboard.com/", "Arrow & Board", "fashion", "Fashion and watch accessories."],
        ["https://chiodospecs.com/", "Chiodo Specs", "fashion", "Eyewear and sunglasses."],
        ["https://vaamsport.de/", "VAAM Sport", "fashion", "Sportswear and clothing.", "Germany"],
        ["https://www.jessieandjames.co.uk/", "Jessie & James", "fashion", "Clothing and fashion.", "UK"],
        ["https://ragdoll-la.com/", "Ragdoll LA", "fashion", "Women's fashion label.", "Los Angeles, USA"],
        ["https://capitainedabord.com/", "Capitaine d'abord", "fashion", "Clothing and fashion.", "France"],
        ["https://www.medmenshop.com/", "Medmen Shop", "fashion", "Clothing and fashion store."],
        // Art & Photography
        ["https://lesaltylabel.com.au/", "Le Salty Label", "art", "Art & photography store.", "Australia"],
        ["https://www.littlepulp.com/", "Little Pulp", "art", "Art prints and photography."],
        // Cosmetics
        ["https://www.elfcosmetics.com/", "e.l.f. Cosmetics", "beauty", "Makeup and skincare brand.", "USA"],
        ["https://www.bhcosmetics.com/", "BH Cosmetics", "beauty", "Makeup brand.", "USA"],
        ["https://www.flormar.com/", "Flormar", "beauty", "Cosmetics and makeup brand.", "Turkey"],
        ["https://row.feelunique.com/", "Feelunique", "beauty", "International beauty retailer.", "UK"],
        // Health & Beauty
        ["https://www.provencebeauty.com/", "Provence Beauty", "beauty", "Health and beauty products.", "USA"],
        ["https://www.wacaco.com/", "Wacaco", "electronics", "Portable espresso machines and coffee gear."],
        // Home & Garden
        ["https://theao.life/", "The AO Life", "home", "Home & garden products store."],
        // Toys & Games
        ["https://letoyvan.com/", "Le Toy Van", "toys", "Wooden toys and games.", "UK"],
        ["https://mintandmohair.com/", "Mint & Mohair", "toys", "Toys and gifts store."]
      ]
    }
  ];

  const slug = (url) => "shopify-" + new URL(url).hostname.replace(/^www\.|^shop\.|^store\./, "").replace(/[^a-z0-9]+/gi, "-").replace(/-+$/, "").toLowerCase();

  const seen = new Set(window.PORTFOLIO.projects.map((p) => p.url.replace(/\/$/, "").replace("://www.", "://")));
  groups.forEach((g) => {
    g.stores.forEach(([url, name, industry, summary, location]) => {
      const key = url.replace(/\/$/, "").replace("://www.", "://");
      if (seen.has(key)) return; // skip duplicates
      seen.add(key);
      window.PORTFOLIO.projects.push({
        id: slug(url),
        name,
        url,
        summary,
        description: `${summary} ${g.type} built on Shopify.`,
        type: g.type,
        tags: g.tags,
        industry,
        tech: g.tech,
        features: g.features,
        location: location || "—"
      });
    });
  });
})();
