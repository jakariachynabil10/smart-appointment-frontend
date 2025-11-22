import { Box, Container, Typography } from "@mui/material";
import AboutImage from "../../../../../public/About.png";
import Image from "next/image";

const AboutBanner = () => {
  return (
    <>
      <Box className="bg-linear-to-b from-white via-blue-50 to-white">
        <Container className="py-16 md:py-24 lg:py-32">
          <Box className="flex flex-col lg:flex-row justify-between items-center gap-10">
            {/* LEFT TEXT AREA */}
            <Box>
              <Typography
                fontSize={{ xs: "32px", sm: "40px", lg: "52px" }}
                fontWeight="bold"
                className="leading-tight text-gray-900"
              >
                About QuickMeet: Your <br /> Bridge to Seamless <br />
                Collaboration
              </Typography>

              <Typography className="text-neutral-600 opacity-80 mt-5 pt-4 text-sm sm:text-base leading-relaxed w-[50%]">
                QuickMeet is dedicated to revolutionizing how teams connect and
                collaborate. Our intuitive platform ensures that every meeting
                is productive, every discussion is clear, and every idea finds
                its voice. We empower businesses to achieve more through
                superior communication tools.
              </Typography>

              {/* 🔥 QUOTE BOX EXACTLY LIKE YOUR SCREENSHOT */}
              <Box
                className="
                  mt-8 p-6 sm:p-7 
                  rounded-2xl 
                  bg-white 
                  shadow-sm 
                  border border-neutral-200 
                  relative
                  w-[50%]
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
                  “Our mission is to foster a world where communication is
                  effortless, and collaboration knows no bounds, enabling
                  individuals and teams to achieve their full potential.”
                </Typography>
              </Box>
            </Box>

            {/* RIGHT SIDE IMAGE OR CONTENT */}
            <Box>
              <Image
                src={AboutImage}
                alt="About Image"
                className="w-[800px] h-auto drop-shadow-xl"
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
