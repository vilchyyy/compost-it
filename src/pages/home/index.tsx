import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-scroll";
export default function Home() {
  return (
    <div>
      <div className="min-v-screen flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1601788505117-18947ac4f2e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] bg-cover bg-no-repeat">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="mb-10 select-none text-9xl font-bold text-neutral-300">
            Compost it
          </h1>
          <motion.div
            animate={{ translateY: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Link to="nav" smooth={true} duration={700}>
              <IoIosArrowDown size="5rem" className=" fill-neutral-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-1 flex h-96 ">
        <nav className="w-4/12" id="nav">
          <motion.ul
            initial={{ opacity: 0, translateX: -10 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex h-full flex-col items-center justify-evenly"
          >
            <li className="text-3xl">test</li>
            <li className="text-3xl">test</li>
            <li className="text-3xl">test</li>
            <li className="text-3xl">test</li>
            <li className="text-3xl">test</li>
          </motion.ul>
        </nav>
        <div className="w-8/12"></div>
      </div>
      <footer className="v-max flex items-center justify-center bg-neutral-800 py-6 text-3xl text-neutral-200">
        Footer
      </footer>
    </div>
  );
}
