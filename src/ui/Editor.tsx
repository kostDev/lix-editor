import React, { useRef } from "react";
import {Box, chakra, Textarea, VStack} from "@chakra-ui/react";
import {FileStatus, useFilesStore} from "../stores/FilesStore.ts";
import "./editor.css";

const LineNumber = chakra('span');

// const keywords = /\b(function|return|var|let|const|if|else|for|while|switch|case|break|continue|new|try|catch|throw|typeof|instanceof)\b/g;
// const functions = /\b([a-zA-Z_]\w*)\s*(?=\()/g;
// const numbers = /\b\d+\b/g;
// const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;

// const simpleHighlight = (code: string) => {
//   const tokens = [];
//   let lastIndex = 0;
//
//   const processRegex = (regex: RegExp, type: string) => {
//     let match;
//     while ((match = regex.exec(code)) !== null) {
//       const [fullMatch] = match;
//       const startIndex = match.index;
//       const endIndex = startIndex + fullMatch.length;
//
//       // Додаємо текст до знайденого елементу
//       if (lastIndex < startIndex) {
//         tokens.push({ type: 'text', content: code.slice(lastIndex, startIndex) });
//       }
//
//       tokens.push({ type, content: fullMatch });
//       lastIndex = endIndex;
//     }
//   };
//
//   processRegex(keywords, 'keyword');
//   processRegex(functions, 'function');
//   processRegex(numbers, 'number');
//   processRegex(strings, 'string');
//
//   if (lastIndex < code.length) {
//     tokens.push({ type: 'text', content: code.slice(lastIndex) });
//   }
//
//   return tokens;
// };


function Editor() {
  const status = useFilesStore(s => s.status);
  const file = useFilesStore(s => s.file);
  const lines = useFilesStore(s => s.lines);
  const localUpdateFileContent = useFilesStore(s => s.localUpdateFileContent);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    localUpdateFileContent(e.target.value);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement | HTMLPreElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    // Синхронізуємо скрол нумерації з textarea
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  // const highlightedTokens = simpleHighlight(file);

  return status !== FileStatus.NONE ? (
    <Box display="flex" flexDirection="row" zIndex={1} pt={3} overflow="auto" height="calc(100vh - 2.5rem)">
      <VStack
        align="end"
        spacing={0}
        px={3}
        borderRight="1px"
        // borderColor="whiteAlpha.50"
        userSelect="none"
        ref={lineNumbersRef}
        overflow="hidden"
      >
        {lines.map((line) => (
          <LineNumber
            key={`code-line-${line}`}
            fontSize="0.75rem"
            fontFamily="monospace"
            color="whiteAlpha.500"
            lineHeight="1.5em"
            opacity={0.5}
          >
            {line}
          </LineNumber>
        ))}
      </VStack>

      {/*<pre*/}
      {/*  onScroll={handleScroll}*/}
      {/*  aria-hidden="true"*/}
      {/*  style={{*/}
      {/*    position: 'absolute',*/}
      {/*    top: '4px',*/}
      {/*    left: '1.95rem',*/}
      {/*    width: '100%',*/}
      {/*    margin: 0,*/}
      {/*    padding: '8px',*/}
      {/*    // backgroundColor: '#282c34',*/}
      {/*    color: 'white',*/}
      {/*    whiteSpace: 'pre-wrap',*/}
      {/*    overflowWrap: 'break-word',*/}
      {/*    pointerEvents: 'none',*/}
      {/*    zIndex: 2,*/}
      {/*    lineHeight: "1.5em",*/}
      {/*    fontSize: '0.75rem',*/}
      {/*    fontFamily: 'monospace',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {highlightedTokens.map((token, index) => {*/}
      {/*    switch (token.type) {*/}
      {/*      case 'keyword':*/}
      {/*        return (*/}
      {/*          <span key={index} style={{ color: '#569cd6', fontWeight: 'bold' }}>*/}
      {/*            {token.content}*/}
      {/*          </span>*/}
      {/*        );*/}
      {/*      case 'function':*/}
      {/*        return (*/}
      {/*          <span key={index} style={{ color: '#dcdcaa' }}>*/}
      {/*            {token.content}*/}
      {/*          </span>*/}
      {/*        );*/}
      {/*      case 'number':*/}
      {/*        return (*/}
      {/*          <span key={index} style={{ color: '#b5cea8' }}>*/}
      {/*            {token.content}*/}
      {/*          </span>*/}
      {/*        );*/}
      {/*      case 'string':*/}
      {/*        return (*/}
      {/*          <span key={index} style={{ color: '#d69d85' }}>*/}
      {/*            {token.content}*/}
      {/*          </span>*/}
      {/*        );*/}
      {/*      default:*/}
      {/*        return <span key={index}>{token.content}</span>;*/}
      {/*    }*/}
      {/*  })}*/}
      {/*</pre>*/}

      <Textarea
        color="ghostwhite"
        // color="transparent"
        height="-webkit-fill-available"
        value={file}
        borderRadius={0}
        padding={0}
        fontSize="0.75rem"
        border="none"
        resize="none"
        whiteSpace="pre"
        lineHeight="1.5em"
        sx={{_focus: {boxShadow: "none", outline: "none", borderColor: "grayAlpha.800"}, caretColor:"goldenrod"}}
        onChange={handleChange}
        onScroll={handleScroll}
        zIndex={1}
        readOnly={status === FileStatus.READ}
      />
    </Box>
  ) : <></>;
}

export default Editor;