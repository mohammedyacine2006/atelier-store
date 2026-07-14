import { Product } from './types';

export const products: Product[] = [
  {
    id: "hb-1",
    name: "The Atelier Grain Bag",
    price: 1850,
    category: "handbags",
    shortDescription: "Sculpted pebbled calfskin shoulder bag with hand-painted edges and bespoke brass hardware.",
    description: "An architectural masterpiece designed for everyday utility and lifelong endurance. Crafted by hand in our Florence workshop, The Atelier Grain Bag features double-tanned French calfskin leather that develops a beautiful patina over time. Seamlessly integrated magnetic closures keep your essentials safe, while the adjustable suede-lined strap provides ultimate comfort.",
    details: [
      "French pebbled calfskin leather outer",
      "Suede leather interior lining",
      "Hand-finished gold-toned solid brass hardware",
      "Two interior compartments, one zipped pocket",
      "Made in Florence, Italy"
    ],
    materials: "100% full-grain calfskin leather, responsibly sourced from certified LWG tanneries. Lining: 100% natural suede.",
    shipping: "Complimentary standard carbon-neutral shipping on all orders. Arrives in signature linen dustbag and heavy-grain gift box within 3-5 business days.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Oatmeal", hex: "#E5D9C8" },
      { label: "Sable", hex: "#8E7D6F" },
      { label: "Noir", hex: "#1C1C1C" }
    ],
    sizes: ["Standard"]
  },
  {
    id: "hb-2",
    name: "The Minimalist Box Tote",
    price: 2100,
    category: "handbags",
    shortDescription: "Structured tote in matte box-calf leather with soft rounded edges and double top handles.",
    description: "Defining modern minimalism, the Box Tote merges a sharp structured silhouette with soft organic curves. The premium box-calf leather provides a refined matte glaze, accented by subtle, blind-embossed branding. A leather lanyard with key clip is attached inside.",
    details: [
      "Matte glazed box-calf leather",
      "Twin rounded top handles (12cm drop)",
      "Understated blind-embossed typography",
      "Structured base with protective metal feet",
      "Includes protective linen dust bag"
    ],
    materials: "Premium Box-Calf Leather. Lining: Bonded matte lambskin.",
    shipping: "Ships worldwide. Free express shipping in North America and Europe. Standard duties may apply for other regions.",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Alabaster", hex: "#F2EFE9" },
      { label: "Espresso", hex: "#3D2B1F" },
      { label: "Noir", hex: "#1C1C1C" }
    ],
    sizes: ["Medium", "Large"]
  },
  {
    id: "hb-3",
    name: "The Suede Slouch Hobo",
    price: 1650,
    category: "handbags",
    shortDescription: "Relaxed slouchy hobo in ultra-soft Italian split suede with structured base.",
    description: "Laid-back elegance defined. The Suede Slouch Hobo drapes beautifully against the silhouette while maintaining a clean, structured bottom. Hand-finished with premium calfskin accents, double contrast stitching, and fully lined with natural herringbone canvas.",
    details: [
      "Water-repellent Italian split suede",
      "Premium calfskin trims and shoulder strap",
      "Durable natural cotton herringbone canvas lining",
      "Internal wall zip pocket and leather card slots",
      "Embossed logo at front strap base"
    ],
    materials: "100% split suede. Trims: 100% vegetable-tanned calf leather. Lining: 100% linen-cotton canvas.",
    shipping: "Standard global express. Returns allowed within 30 days in original dust bag.",
    images: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614179924047-e1bf49a0a0cf?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Tan Suede", hex: "#C68E65" },
      { label: "Olive Suede", hex: "#556B2F" },
      { label: "Charcoal Suede", hex: "#2E2E2E" }
    ],
    sizes: ["Standard"]
  },
  {
    id: "hb-4",
    name: "The Arch Saddle Bag",
    price: 1450,
    category: "handbags",
    shortDescription: "Curved crossbody saddle bag in smooth semi-aniline leather with custom stirrup clasp.",
    description: "Paying homage to equestrian heritage, The Arch Saddle Bag introduces a clean structural curve and minimalist stirrup hardware in champagne gold. The leather is treated with oils and waxes to ensure a rich tactile feel and natural self-healing properties.",
    details: [
      "Smooth semi-aniline French calfskin",
      "Custom gold stirrup hardware magnetic clasp",
      "Adjustable sliding crossbody strap (45-55cm drop)",
      "Rear external slip pocket for quick access",
      "Hand-lacquered edge coloring"
    ],
    materials: "French calfskin leather. Lining: High-density micro-suede.",
    shipping: "Complimentary priority shipping. Securely wrapped in individual luxury presentation box.",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc15a4a0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598532102427-f86e47397648?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Burgundy", hex: "#4A0E17" },
      { label: "Saddle", hex: "#8B5A2B" },
      { label: "Chalk", hex: "#EBE6DD" }
    ],
    sizes: ["Standard"]
  },
  {
    id: "wt-1",
    name: "The Chronograph No. I",
    price: 3400,
    category: "watches",
    shortDescription: "Mechanical automatic watch with an oyster dial, polished steel case, and sapphire glass.",
    description: "Our flagship timepiece represents the pinnacle of watchmaking precision. Engineered with a proprietary Swiss-certified automatic movement, the Chronograph No. I is encased in high-grade 316L polished stainless steel. The dial features custom minimal indices under a double-domed anti-reflective sapphire crystal.",
    details: [
      "Swiss automatic mechanical movement with 42h power reserve",
      "316L surgical-grade stainless steel case (39mm diameter)",
      "Scratch-resistant sapphire crystal front and exhibition caseback",
      "Water-resistant up to 50 meters (5 ATM)",
      "Premium black alligator-pattern leather strap"
    ],
    materials: "Case: 316L Stainless Steel. Dial: Oyster-white lacquer. Strap: Sustainably sourced Italian calf leather.",
    shipping: "Ships via secure, fully insured next-day courier. Signature required upon delivery.",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Silver / Black Strap", hex: "#D4D4D4" },
      { label: "Gold / Cognac Strap", hex: "#E5C158" }
    ],
    sizes: ["38mm", "41mm"]
  },
  {
    id: "wt-2",
    name: "The Horizon Titanium",
    price: 2950,
    category: "watches",
    shortDescription: "Ultra-thin brushed titanium case watch with a clean slate-gray dial and Milanese mesh strap.",
    description: "Featherlight yet virtually indestructible. The Horizon Titanium is micro-blasted for a tactile, matte slate-gray finish. Designed for absolute wearability, the watch sits at an ultra-slim 6.2mm thickness, blending flawlessly with the wrist under tailored outerwear.",
    details: [
      "Ultra-slim mechanical movement with manual wind",
      "Grade 5 brushed titanium case",
      "Matte slate-gray dial with micro-printed indices",
      "Integrated titanium Milanese mesh bracelet with safety clasp",
      "Made in Solothurn, Switzerland"
    ],
    materials: "100% Grade 5 Titanium. Sapphire Crystal.",
    shipping: "Secure worldwide delivery with full tracking. Insured transit in hardbound collectors case.",
    images: [
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Titanium Slate", hex: "#7E8287" }
    ],
    sizes: ["40mm"]
  },
  {
    id: "wt-3",
    name: "The Sovereign Calendar",
    price: 4200,
    category: "watches",
    shortDescription: "Annual calendar mechanical watch featuring complete moonphase dial in 18k rose gold.",
    description: "The Sovereign Calendar combines complicated mechanical horology with a clean, classic presentation. Features custom moonphase indicator, date window, and weekday display, meticulously arranged for perfect dial balance. Wound automatically by an elegant 18k solid gold oscillating rotor visible behind sapphire glass.",
    details: [
      "Proprietary automatic movement with moonphase indicator",
      "18k Rose Gold-plated solid brass casing (40mm diameter)",
      "Double-domed exhibition crystal back with custom gold rotor",
      "Dial with circular grain texture and hand-applied markers",
      "Chocolate hand-stitched alligator strap"
    ],
    materials: "Case: 18k Rose Gold Plate. Dial: Lacquered Opaline. Strap: Ethically sourced genuine alligator.",
    shipping: "Shipped fully insured with GPS-tracked custom priority delivery. White glove handling.",
    images: [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Rose Gold / Brown", hex: "#B87333" },
      { label: "Yellow Gold / Black", hex: "#E5A93C" }
    ],
    sizes: ["40mm"]
  },
  {
    id: "wt-4",
    name: "The Eclipse Obsidian",
    price: 3800,
    category: "watches",
    shortDescription: "Minimalist black ceramic mechanical watch with matte dial and DLC steel hardware.",
    description: "Unparalleled stealth. Built using extreme high-tech zirconium oxide black ceramic, the Eclipse Obsidian offers extreme hardness and complete scratch protection. Features sand-blasted matte black details with dark-filled hands and a rubberized performance FKM strap.",
    details: [
      "High-tech scratch-resistant black ceramic casing",
      "Calibre 80 automatic movement with 80-hour power reserve",
      "DLC-coated crown and exhibition back screws",
      "Super-LumiNova dark anthracite luminescence",
      "High-durability hypoallergenic FKM strap"
    ],
    materials: "Case: Zirconium Ceramic. Glass: Flat anti-reflective sapphire. Strap: Fluoroelastomer (FKM).",
    shipping: "Ships in heavy matte-black composite case with matching titanium tools and dynamic tracking.",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Obsidian Black", hex: "#121212" }
    ],
    sizes: ["42mm"]
  },
  {
    id: "fw-1",
    name: "The Suede Atelier Mule",
    price: 680,
    category: "footwear",
    shortDescription: "Buttery Italian suede slip-on with structured natural cork-leather footbeds.",
    description: "Our Suede Atelier Mule redefines indoor-outdoor elegance. Crafted from fine, water-resistant Italian split suede, it cradles the foot in plush comfort while maintaining a sleek, dressy profile. The natural cork-and-latex footbed dynamically molds to your gait for bespoke support.",
    details: [
      "Water-repellent Italian split suede upper",
      "Anatomical cork-and-latex core footbed",
      "Durable non-slip natural crepe rubber sole",
      "Adjustable strap with a brass buckle",
      "Handcrafted in Porto, Portugal"
    ],
    materials: "Upper: 100% Calf Suede. Lining: Breathable vegetable-tanned leather. Sole: 100% Crepe rubber.",
    shipping: "Complimentary sizing exchanges within 30 days. Ships in a protective shoe pouch and sturdy luxury box.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Taupe Suede", hex: "#C5B3A6" },
      { label: "Espresso Suede", hex: "#4A3B32" }
    ],
    sizes: ["38", "39", "40", "41", "42"]
  },
  {
    id: "fw-2",
    name: "The Classic Chelsea Boot",
    price: 890,
    category: "footwear",
    shortDescription: "Sleek, hand-lasted premium calfskin boot with robust elasticated gussets.",
    description: "The definitive Chelsea silhouette, rendered with absolute structural perfection. Hand-selected French box-calf leather provides a refined, uniform surface. The stacked leather heel is reinforced with a slip-resistant rubber injection, blending traditional cobbling with modern performance.",
    details: [
      "Hand-lasted French box-calf leather",
      "Seamless elastic side panels with high recovery",
      "Webbed nylon pull-tabs for easy entry",
      "Blake-stitched construction for flexibility and recraftability",
      "Handmade in Le Marche, Italy"
    ],
    materials: "Outer: French Box-Calf. Insole & Outsole: Vegetable-tanned leather. Heel cap: Rubber.",
    shipping: "Standard free delivery. Sizing runs slightly large; we recommend ordering half a size down.",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Noir Leather", hex: "#1C1C1C" },
      { label: "Chestnut Leather", hex: "#5D4037" }
    ],
    sizes: ["39", "40", "41", "42", "43", "44"]
  },
  {
    id: "fw-3",
    name: "The Calfskin Penny Loafer",
    price: 720,
    category: "footwear",
    shortDescription: "Elegant slip-on loafer in polished book-binder leather with hand-stitched apron.",
    description: "A timeless Ivy League classic reimagined with a sharper, modern Italian toe and structural heel balance. Crafted from polished box calf leather with a traditional slotted saddle strap, this loafer boasts an exceptionally comfortable flex-sole construction designed for immediate break-in comfort.",
    details: [
      "High-shine polished book-binder box calfskin",
      "Traditionally hand-stitched apron and heel seams",
      "Genuine leather outsole with channel-stitched Blake seam",
      "Anatomical memory gel cushion insole",
      "Crafted by traditional third-generation family cobblers"
    ],
    materials: "Outer: Polished Calfskin. Lining: Vegetable-tanned glove leather. Outsole: Oak-bark tanned leather.",
    shipping: "Standard global shipping. Includes wooden cedar shoe trees and cotton flannel travel bags.",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Cognac Brown", hex: "#704214" },
      { label: "Lacquered Noir", hex: "#121212" }
    ],
    sizes: ["40", "41", "42", "43", "44"]
  },
  {
    id: "fw-4",
    name: "The Cashmere Knitted Slide",
    price: 480,
    category: "footwear",
    shortDescription: "Luxurious loungewear slide featuring knitted Mongolian cashmere upper and suede footbed.",
    description: "The peak of home luxury and travel convenience. A broad, plush, double-ply strap knitted from Grade-A Mongolian cashmere wraps your foot in pure warmth, paired with an anatomically curved split-suede footbed for walking around the hotel, chalet, or executive lounge.",
    details: [
      "Double-ply pure Mongolian cashmere knitted upper strap",
      "Micro-suede piped edges for structural durability",
      "Split suede-covered contoured cork footbed",
      "Lightweight shock-absorbing EVA outsole",
      "Includes matching travel knit pouch"
    ],
    materials: "Strap: 100% Cashmere. Base: Natural Cork & EVA. Lining: Soft cow suede.",
    shipping: "Ships in soft organic cotton pouch and gift-ready cardboard drawer.",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Oatmeal Knit", hex: "#DFD7CD" },
      { label: "Heather Gray", hex: "#9E9E9E" }
    ],
    sizes: ["37", "38", "39", "40", "41", "42"]
  },
  {
    id: "jw-1",
    name: "The Sculpted Twist Band",
    price: 1250,
    category: "jewelry",
    shortDescription: "A heavy, fluidly twisted band cast in solid 18-karat recycled yellow gold.",
    description: "Inspired by the organic contours of wind-carved desert canyons, this solid 18k yellow gold band is designed to be worn as an everyday statement of understated elegance. Each ring is individually poured, cast, and hand-polished to a soft satin-matte finish.",
    details: [
      "Cast in solid 18k recycled yellow gold",
      "Width: 4.8mm at widest point",
      "Comfort-fit curved interior edge",
      "Individually hand-polished with satin-matte finishing",
      "Stamped with official purity hallmark"
    ],
    materials: "100% Recycled 18-Karat Yellow Gold.",
    shipping: "Free priority shipping. Includes a velvet-lined wood presentation box and a certificate of metal authenticity.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Yellow Gold", hex: "#E6CA97" },
      { label: "Rose Gold", hex: "#D9A094" },
      { label: "White Gold", hex: "#E3E3E3" }
    ],
    sizes: ["6", "7", "8", "9"]
  },
  {
    id: "jw-2",
    name: "The Baroque Pearl Pendant",
    price: 950,
    category: "jewelry",
    shortDescription: "Lustrous irregular freshwater pearl suspended from a delicate 18k gold chain.",
    description: "Embrace the beauty of imperfection. Featuring a uniquely formed, high-luster freshwater baroque pearl, this pendant hangs from a delicate, fully adjustable 18-karat gold cable chain. No two pearls are identical, ensuring your piece is entirely unique.",
    details: [
      "High-luster, organically shaped freshwater baroque pearl (approx. 14mm)",
      "18-karat recycled yellow gold bezel and bail",
      "Adjustable 18k yellow gold cable chain (40cm - 45cm length)",
      "Secure lobster clasp closure",
      "Individually selected for luster and iridescence"
    ],
    materials: "Grade AAA Baroque Freshwater Pearl. 18k Recycled Yellow Gold.",
    shipping: "Ships with secure courier signature. Arrives in a silk-lined leather pouch and presentation carton.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Lustrous White / Gold", hex: "#F7F5F0" }
    ],
    sizes: ["Standard"]
  },
  {
    id: "jw-3",
    name: "The Herringbone Chain",
    price: 1100,
    category: "jewelry",
    shortDescription: "Supple and flat liquid-like collar chain in solid 18k yellow gold.",
    description: "Lies flat on the collarbone, moving with liquid suppleness. Solid 18-karat gold links are woven together in a classic herringbone configuration, polished on both sides to catch the light beautifully at every angle. Designed for continuous everyday luxury.",
    details: [
      "Woven solid 18k recycled yellow gold",
      "Width: 3.5mm; thickness: 0.8mm",
      "Total length: 42cm with custom security lobster safety",
      "High-glide fluid link articulation",
      "Completely flat, scratch-resistant surface finish"
    ],
    materials: "100% Recycled 18k Solid Yellow Gold.",
    shipping: "Insured standard delivery with signature. Included luxury pouch and authenticity certificate.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "Yellow Gold", hex: "#E6CA97" },
      { label: "Rose Gold", hex: "#D9A094" }
    ],
    sizes: ["42cm"]
  },
  {
    id: "jw-4",
    name: "The Diamond Solitaire Cuff",
    price: 2400,
    category: "jewelry",
    shortDescription: "Slim open cuff bracelet in 18k recycled white gold with set round-cut diamond.",
    description: "A single, brilliant round-cut lab-grown diamond is bead-set at the terminal edge of an ultra-slim, tempered solid white gold wire cuff. Designed to be stacked or worn solo as an understated sparkle reflecting absolute luxury and precision setting.",
    details: [
      "0.25-carat round brilliant-cut diamond (F-G color, VVS2 clarity)",
      "Tempered 18k recycled white gold flexible cuff",
      "Open hinge-less design for seamless slide-on",
      "Precision bezel-bead secure setting",
      "Individually hand-contoured in London"
    ],
    materials: "18k Recycled White Gold. Conflict-free lab-grown diamond.",
    shipping: "Complimentary fully insured DHL courier. Arrives with official gemological verification report.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
    ],
    colors: [
      { label: "White Gold", hex: "#E3E3E3" },
      { label: "Yellow Gold", hex: "#E6CA97" }
    ],
    sizes: ["Small", "Medium"]
  }
];
