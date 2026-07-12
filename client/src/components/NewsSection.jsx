import React from 'react'
import { Box, Flex, Text, Badge } from '@chakra-ui/react'
import { Calendar, Newspaper } from 'lucide-react'

export function NewsSection({ news }) {
  const defaultNews = [
    {
      title: "Apple introduces new AI-focused chips with improved power efficiency",
      source: "TechDaily",
      date: "2 hours ago",
      sentiment: "Positive",
      summary: "The company announced its latest generation of silicon during a hardware event, focusing heavily on local model execution capabilities and advanced thermal designs."
    },
    {
      title: "Antitrust scrutiny intensifies over app store payment guidelines",
      source: "Finance Wire",
      date: "1 day ago",
      sentiment: "Negative",
      summary: "Regulatory boards in the EU are investigating compliance regarding payment gateways and commissions, possibly impacting services margins."
    },
    {
      title: "Global supply chains stabilize as shipping backlog eases",
      source: "MarketWatch",
      date: "3 days ago",
      sentiment: "Neutral",
      summary: "Retailers and device manufacturers report steady logistics flow heading into the next fiscal quarter."
    }
  ]

  const items = news || defaultNews

  return (
    <Box
      bg="surface"
      border="1px solid"
      borderColor="border"
      borderRadius="xl"
      p="6"
      boxShadow="sm"
      width="100%"
    >
      <Flex align="center" gap="2" mb="5">
        <Box color="brand" display="flex" alignItems="center">
          <Newspaper size={20} />
        </Box>
        <Text fontSize="16px" fontWeight="bold" color="text.primary">
          Latest Research Insights & News
        </Text>
      </Flex>

      <Flex direction="column" gap="5">
        {items.map((item, index) => {
          let badgeColor = "gray.700"
          let badgeBg = "gray.100"
          let badgeBorder = "gray.300"
          
          if (item.sentiment === "Positive") {
            badgeColor = "brand"
            badgeBg = "rgba(15, 110, 86, 0.08)"
            badgeBorder = "brand"
          } else if (item.sentiment === "Negative") {
            badgeColor = "negative"
            badgeBg = "rgba(229, 62, 98, 0.08)"
            badgeBorder = "negative"
          }

          return (
            <Box
              key={index}
              p="4"
              border="1px solid"
              borderColor="border"
              borderRadius="lg"
              transition="all 0.2s ease"
              _hover={{ borderColor: "brand", boxShadow: "sm" }}
            >
              <Flex justify="space-between" align="flex-start" gap="4" mb="2">
                <Text fontSize="15px" fontWeight="bold" color="text.primary" lineHeight="1.4">
                  {item.title}
                </Text>
                <Badge
                  color={badgeColor}
                  bg={badgeBg}
                  border="1px solid"
                  borderColor={badgeBorder}
                  fontSize="11px"
                  fontWeight="bold"
                  borderRadius="md"
                  px="2"
                  py="0.5"
                  textTransform="none"
                >
                  {item.sentiment}
                </Badge>
              </Flex>

              <Text fontSize="13px" color="text.muted" mb="3" lineHeight="1.5">
                {item.summary}
              </Text>

              <Flex justify="space-between" align="center" fontSize="12px" color="text.muted">
                <Text fontWeight="medium">{item.source}</Text>
                <Flex align="center" gap="1">
                  <Calendar size={12} />
                  <Text>{item.date}</Text>
                </Flex>
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
