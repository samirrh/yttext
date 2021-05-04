import React, { useEffect, useState } from 'react';
import { ChromeMessage, Sender } from '../types';
import { getCurrentTabUrl } from '../chrome/utils';
import {
  Heading,
  BanCircleIcon,
  TickCircleIcon,
  ClipboardIcon,
  TickIcon,
  VideoIcon,
  SearchTextIcon,
} from 'evergreen-ui';
import {
  Box,
  Text,
  HStack,
  Textarea,
  Button,
  Spinner,
  Input,
  useClipboard,
  Center,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
export const Home = () => {
  const [url, setUrl] = useState<string>('');
  const [APIRes, setAPIRes] = useState<string>('');
  const { hasCopied, onCopy } = useClipboard(APIRes);

  //https://www.youtube.com/watch?v=wjIAuis3DMk good test video
  //will need to have the yttext api being served on port 8000
  const callAPI = (url: String, t: String) => {
    fetch(`http://localhost:8000/api?videoURL=${url}&t=${t}`)
      .then((res) => res.text())
      .then((res) => setAPIRes(res))
      .catch((err) => err);
  };
  /**
   * Get current URL
   */
  useEffect(() => {
    getCurrentTabUrl((url) => {
      setUrl(url || 'undefined');
    });
    chrome.tabs.executeScript(
      {
        code: 'document.querySelector("video").currentTime',
      },
      (results) => {
        const time = results && results[0];
        // console.log(time)
        // var intTime = Math.round( time );
        callAPI(encodeURI(url), time);
      }
    );
  }, [url]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;
    setAPIRes(newText);
  };

  return (
    <>
      <Box w={350} h={300} borderRadius="xl" p={4}>
        <Box mr={2}>
          <HStack>
            <Text
              bgGradient="linear(to-l, orange.400 , red.300)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="bold"
            >
              YouText
            </Text>
            <VideoIcon color="danger" />
            <SearchTextIcon color="danger" />
          </HStack>
        </Box>
        <Box my={5}>
          <HStack>
            <Heading size={600}>URL:</Heading>
            <Input value={url} variant="filled" w="85%" />
            {url.startsWith('https://www.youtube.com/watch?v=') ? (
              <TickCircleIcon color="success" marginRight={16} />
            ) : (
              <BanCircleIcon color="danger" marginRight={16} />
            )}
          </HStack>
        </Box>

        <Box my={4}>
          <Text fontSize="md" mb={2}>
            Youtube Frame Text:
          </Text>
          {APIRes === '' ? (
            <Center mt={10}>
              <Spinner />
            </Center>
          ) : (
            <>
              <Textarea
                value={APIRes}
                resize="none"
                onChange={handleInputChange}
              />
            </>
          )}
        </Box>
      </Box>
      <Center mb={2}>
        <Button onClick={onCopy}>
          {hasCopied ? (
            <>
              Copied <TickIcon />
            </>
          ) : (
            <>
              Copy <ClipboardIcon />
            </>
          )}
        </Button>
      </Center>
      <Footer></Footer>
    </>
  );
};
