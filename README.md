# URL Shortener
The URL Shortener is a free tool designed to shorten URLs and generate concise links, making them easier to share. This service simplifies the process of creating shortened links, allowing users to effortlessly shorten lengthy URLs for sharing across different digital platforms. Moreover, the URL Shortener offers extensive analytics for each generated URL. Users can access detailed insights, such as the date and time of each click, the total number of clicks, the devices used to access the link, and the referral sources. These analytics are visualized through intuitive charts, offering users a clear understanding of their link's performance.

# Features 
- Shorten long URLs.
- Implement secure user authentication and authorization, ensuring that users can only access their own URLs.
- Provide detailed analysis for each URL, including:
   - The number of clicks with the date.
   - Referral sources.
   - Traffic Locations
   - Browser and device types used to access the URLs.
   - Offer an API for accessing these analytics.
- Display top URLs with high hits.
- Ensure security with Clerk and Vercel PostgreSQL.

  
# Live Demo 
This Project is live on https://url-tau-eight.vercel.app/

# ScreenShot

![image](https://github.com/raunak-dev-edu/url-shortner/assets/95216822/18fe5d39-ba9d-479e-be75-05598a18eaca)
![image](https://github.com/raunak-dev-edu/url-shortner/assets/95216822/b24017be-5866-458d-829c-f8178ee3ab60)
![image](https://github.com/raunak-dev-edu/url-shortner/assets/95216822/cf9eecad-4169-46c8-99ec-8ac005aee850)
![image](https://github.com/raunak-dev-edu/url-shortner/assets/95216822/50c60e84-9668-47b6-a569-9d5886de81a4)

# Approach
### Analytics Implementation
For analytics, I've built a system to track click events on shortened URLs. Here's how it works:
- **Click Tracking**: Each time a URL is accessed, I log the click event with details like timestamp, device type, and referral source.
- **Data Storage**: I use Vercel PostgreSQL for secure storage of click data. It's scalable and reliable, ensuring efficient handling of large datasets.
- **Analytics Visualization**: Users get intuitive charts showing total clicks over time, referral sources, active hours, and device/browser breakdown.

### Scalability Solutions
To handle growing traffic, I implement:
- **Database Optimization**: Efficient queries and indexing for fast data retrieval.
- **Horizontal Scaling**: Vercel PostgreSQL supports it, allowing for increased compute resources.
- **Caching**: Data and frequently accessed pages are cached to reduce database load.
- **Load Balancing**: Vercel's load balancing distributes traffic across multiple server instances.
- **Monitoring and Alerting**: Proactive monitoring of database and server performance ensures optimal system functioning.

With these strategies, I ensure our URL shortener remains fast, reliable, and scalable for all users.



# Tech Stack
- NextJs
- TypeScript
- Tailwind CSS
- Prisma
- Clerk
- Vercel Postgresql

