const products = 
[
   {
      id: '0123456789',
      name: 'Winter body', // Name of product
      assets: '/item1',    // Path of product images
      price: 109.99,       // Sell price
      multiplier: 1.5,     // What price used to be before sale
                           // Short description
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', 
                           // image filenames in assets folder
      details: [
         {icon: 'fas fa-bolt', title: 'Quick Connection', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-volume-up', title: 'High Quality Audio', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-wifi', title: 'Wireless Charging', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-battery-full', title: 'All-Day Battery', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-dollar-sign', title: 'Affordable', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
      ],
      images: [
         '/item1.jpg', 
         '/item2.jpg', 
         '/item3.jpg', 
         '/item4.jpg', 
         '/item5.jpg'
      ]
   },
   {
      id: '1234567890',
      name: 'Adidas', 
      assets: '/item2', 
      price: 79.99,
      multiplier: 1.5,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', 
      details: [
         {icon: 'fas fa-bolt', title: 'Quick Connection', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-volume-up', title: 'High Quality Audio', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-wifi', title: 'Wireless Charging', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-battery-full', title: 'All-Day Battery', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-dollar-sign', title: 'Affordable', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
      ],
      images: [
         '/item2.jpg', 
         '/item1.jpg', 
         '/item3.jpg', 
         '/item4.jpg', 
         '/item5.jpg'
      ]
   },
   {
      id: '2345678901',
      name: 'Vans', 
      assets: '/item3', 
      price: 119.99,
      multiplier: 1.5,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', 
      details: [
         {icon: 'fas fa-bolt', title: 'Quick Connection', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-volume-up', title: 'High Quality Audio', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-wifi', title: 'Wireless Charging', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-battery-full', title: 'All-Day Battery', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
         {icon: 'fas fa-dollar-sign', title: 'Affordable', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.'},
      ],
      images: [
         '/item3.jpg', 
         '/item1.jpg', 
         '/item2.jpg', 
         '/item4.jpg', 
         '/item5.jpg'
      ]
   },
   {
      id: '3456789012',
      name: 'White', 
      assets: '/item4', 
      price: 259.99,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', 
      images: [
         '/item4.jpg', 
         '/item1.jpg', 
         '/item2.jpg', 
         '/item3.jpg', 
         '/item5.jpg'
      ]
   },
   {
      id: '4567890123',
      name: 'Cropped-sho', 
      assets: '/item5', 
      price: 159.99,
      multiplier: 1.5,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', 
      images: [
         '/item5.jpg', 
         '/item1.jpg', 
         '/item2.jpg', 
         '/item3.jpg', 
         '/item4.jpg'
      ]
   },
   {
      id: '5678901234',
      name: 'Cropped-sho', 
      assets: '/item5', 
      price: 159.99,
      multiplier: 1.5,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', 
      images: [
         '/item5.jpg', 
         '/item1.jpg', 
         '/item2.jpg', 
         '/item3.jpg', 
         '/item4.jpg'
      ]
   },
]

export default products;

// THEME COLORS
// cool purple: #9c27b0;
// awesome salmon: #ee6e73;
// dark blue: #253167;