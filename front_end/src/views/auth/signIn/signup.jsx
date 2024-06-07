import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp() {
  const history = useHistory();
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      history.push("/auth/sign-in");
    } catch (err) {
      setError("Error registering user");
      console.error(err);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Create an Account
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your details to create your account!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                First Name<Text color="red.500">*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                type="text"
                placeholder="First Name"
                mb="24px"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Last Name<Text color="red.500">*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                type="text"
                placeholder="Last Name"
                mb="24px"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color="red.500">*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                type="email"
                placeholder="mail@simmmple.com"
                mb="24px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Password<Text color="red.500">*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Button
                    variant="ghost"
                    onClick={handleClickShowPassword}
                    size="sm"
                  >
                    {showPassword ? (
                      <MdOutlineRemoveRedEye />
                    ) : (
                      <RiEyeCloseLine />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Confirm Password<Text color="red.500">*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Confirm your password"
                  mb="24px"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Button
                    variant="ghost"
                    onClick={handleClickShowPassword}
                    size="sm"
                  >
                    {showPassword ? (
                      <MdOutlineRemoveRedEye />
                    ) : (
                      <RiEyeCloseLine />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {error && <Text color="red.500" mb="24px">{error}</Text>}
              <Button
                fontSize="sm"
                type="submit"
                variant="solid"
                w="100%"
                h="50"
                mb="24px"
              >
                Sign Up
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
