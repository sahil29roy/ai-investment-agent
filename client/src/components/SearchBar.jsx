import React from 'react'
import { Input, Box, Flex } from '@chakra-ui/react'
import { Search } from 'lucide-react'

export function SearchBar({ value, onChange, placeholder = "Search for a company or ticker (e.g. AAPL, NVDA, TSLA)...", onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value)
    }
  }

  return (
    <Box position="relative" width="100%">
      <Flex
        align="center"
        bg="transparent"
        borderBottom="2px solid"
        borderColor="border"
        px="2"
        height="40px"
        transition="all 0.2s ease"
      >
        <Box color="text.primary" mr="3" display="flex" alignItems="center">
          <Search size={16} />
        </Box>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          variant="plain"
          bg="transparent"
          border="none"
          outline="none"
          boxShadow="none"
          _focus={{ outline: "none", boxShadow: "none" }}
          height="100%"
          width="100%"
          color="text.primary"
          fontSize="14px"
          fontFamily="body"
          px="0"
          _placeholder={{ color: "text.muted", opacity: 0.6, fontSize: "14px", fontFamily: "body" }}
        />
      </Flex>
    </Box>
  )
}
