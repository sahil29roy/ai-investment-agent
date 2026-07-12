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
        bg="surface"
        border="1px solid"
        borderColor="border"
        borderRadius="xl"
        px="4"
        height="48px"
        boxShadow="sm"
        transition="all 0.2s ease"
        _focusWithin={{ borderColor: "brand", boxShadow: "md" }}
      >
        <Box color="brand" mr="3" display="flex" alignItems="center">
          <Search size={18} />
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
          fontSize="15px"
          fontFamily="body"
          px="0"
          _placeholder={{ color: "text.muted", opacity: 0.6, fontSize: "14px", fontFamily: "body" }}
        />
      </Flex>
    </Box>
  )
}
