import { Box, Container, Typography } from "@mui/material";
import AboutImage from "../../../../../public/About.png";
import Image from "next/image";

const AboutBanner = () => {
  return (
    <>
      <Box className="bg-linear-to-b from-[#EAF3FF] via-[#F5F9FF] to-white">
        <Container className="py-10 sm:py-16 md:py-24 lg:py-32">
          <Box
            className="
              flex 
              flex-col-reverse lg:flex-row 
              justify-between 
              items-center 
              gap-10 lg:gap-5
            "
          >
            {/* LEFT TEXT AREA */}
            <Box className="text-center lg:text-left max-w-[650px]">
              <Typography
                fontSize={{ xs: "26px", sm: "34px", lg: "50px" }}
                fontWeight="bold"
                className="leading-tight! text-gray-900"
              >
                About QuickMeet: Your <br /> Bridge to Seamless <br />
                Collaboration
              </Typography>

              <Typography className="text-neutral-600 opacity-80 mt-5! pt-4! text-sm! sm:text-base! leading-relaxed!">
                QuickMeet is dedicated to revolutionizing how teams connect
                <span className="hidden lg:inline">
                  <br />
                </span>
                and collaborate. Our intuitive platform ensures that every
                <span className="hidden lg:inline">
                  <br />
                </span>
                meeting is productive, every discussion is clear, and every idea
                <span className="hidden lg:inline">
                  <br />
                </span>
                finds its voice. We empower businesses to achieve more
                <span className="hidden lg:inline">
                  <br />
                </span>
                through superior communication tools.
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
                  “Our mission is to foster a world where communication
                  <span className="hidden lg:inline">
                    <br />
                  </span>
                  is effortless, and collaboration knows no bounds,
                  <span className="hidden lg:inline">
                    <br />
                  </span>
                  enabling individuals and teams to achieve their full
                  <span className="hidden lg:inline">
                    <br />
                  </span>
                  potential.”
                </Typography>
              </Box>
            </Box>

            {/* RIGHT IMAGE — BUT FIRST ON MOBILE */}
            <Box className="flex justify-center w-full lg:w-auto">
              <Image
                src={AboutImage}
                alt="About Image"
                className="
                  w-64 sm:w-80 md:w-96 lg:w-[520px] 
                  h-auto 
                  drop-shadow-xl
                "
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
