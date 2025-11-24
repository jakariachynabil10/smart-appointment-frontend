import { Box, Container, Typography } from "@mui/material";
import AboutImage from "../../../../../public/About.png";
import Image from "next/image";

const AboutBanner = () => {
  return (
    <>
      <Box className="bg-linear-to-b from-[#EAF3FF] via-[#F5F9FF] to-white">
        <Container className="py-10 sm:py-16 md:py-24 lg:py-32">
          <Box className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-5">

            {/* LEFT TEXT AREA */}
            <Box className="text-center lg:text-left max-w-[650px]">
              <Typography
                fontSize={{ xs: "28px", sm: "36px", lg: "52px" }}
                fontWeight="bold"
                className="leading-tight! text-gray-900"
              >
                About QuickMeet: Your <br /> Bridge to Seamless <br />
                Collaboration
              </Typography>

              <Typography className="text-neutral-600 opacity-80 mt-5 pt-4 text-sm sm:text-base leading-relaxed">
                QuickMeet is dedicated to revolutionizing how teams connect <br /> and
                collaborate. Our intuitive platform ensures that every <br /> meeting
                is productive, every discussion is clear, and every idea <br /> finds
                its voice. We empower businesses to achieve more <br /> through
                superior communication tools.
              </Typography>

              {/* QUOTE BOX */}
              <Box
                className="
                  mt-8 p-5 sm:p-7 
                  rounded-2xl 
                  bg-white 
                  shadow-sm 
                  border border-neutral-200 
                  relative
                  text-left
                "
              >
                {/* LEFT BLUE BAR */}
                <Box
                  className="
                    absolute left-0 top-0 bottom-0 
                    w-1.5 
                    rounded-l-2xl 
                    bg-blue-500
                  "
                />

                {/* QUOTE TEXT */}
                <Typography className="italic text-neutral-700 text-sm sm:text-base leading-relaxed pl-4">
                  “Our mission is to foster a world where communication <br /> is
                  effortless, and collaboration knows no bounds,<br /> enabling
                  individuals and teams to achieve their full <br /> potential.”
                </Typography>
              </Box>
            </Box>

            {/* RIGHT IMAGE */}
            <Box className="flex justify-center w-full lg:w-auto">
              <Image
                src={AboutImage}
                alt="About Image"
                className="w-64 sm:w-80 md:w-96 lg:w-[520px] h-auto drop-shadow-xl"
                priority
              />
            </Box>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutBanner;
