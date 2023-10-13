import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head'
import Authprovider from '@/components/Authprovider/Authprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Citikartt: Your Ultimate Destination for Hyperlocal Ecommerce Excellence',
  description: `Citikartt: Your Ultimate Destination for Hyperlocal Ecommerce Excellence

  Welcome to Citikartt, where we're dedicated to revolutionizing your shopping experience in every imaginable category. Our mission is simple yet profound: to provide you with the very best and fastest services, covering a wide spectrum of goods. At Citikartt, we're not just an online marketplace; we're your trusted companion on your shopping journey.
  
  Unparalleled Selection:
  Citikartt boasts an extensive selection that spans all categories of products you could ever desire. Whether you're in search of the latest fashion trends, cutting-edge electronics, essential home appliances, gourmet foods, or anything in between, we've got you covered. With Citikartt, your shopping options are limitless.
  
  Hyperlocal Convenience:
  Our hyperlocal ecommerce approach brings convenience to your doorstep. We understand that time is of the essence, and that's why we've meticulously curated a network of local sellers and service providers to ensure that your orders are fulfilled swiftly, often from your nearby neighborhoods. Say goodbye to long shipping times and hello to instant gratification.
  
  Superior Services:
  At Citikartt, we're committed to excellence. Our platform isn't just about shopping; it's about delivering a seamless, user-friendly experience. From intuitive search functionality to secure payment processing and responsive customer support, we've left no stone unturned in ensuring that your satisfaction remains our top priority.
  
  The Citikartt Difference:
  With Citikartt, you're not just a customer; you're a valued member of our growing community. We believe in fostering strong relationships and trust with our users, which is why we continually strive to enhance your shopping journey. Join us today, and experience the Citikartt difference for yourself.
  
  Experience the future of shopping with Citikartt, your one-stop destination for all your needs, where speed and variety meet to create an unforgettable ecommerce adventure. Shop smarter, shop faster, shop Citikartt.`,
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <Head>
        <link rel="icon" href='/favicon.ico' />
      </Head>

      <body className={inter.className}>
        <div className='min-h-[89vh]'>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <Authprovider>
            <Navbar />
            {children}
          </Authprovider>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  )
}