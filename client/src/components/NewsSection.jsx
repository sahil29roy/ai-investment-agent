import React from 'react'
import { Box, Flex, Text, Separator } from '@chakra-ui/react'

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
    <Box width="100%">
      <Flex direction="column" gap="4">
        {/* Title */}
        <Text fontSize="16px" fontWeight="bold" fontFamily="body" color="text.primary" textTransform="uppercase" letterSpacing="0.08em">
          Market Intelligence & Research Dispatches
        </Text>

        <Separator borderColor="border" borderWidth="1px" />

        <Flex direction="column" gap="6">
          {items.map((item, index) => {
            let sentimentColor = "text.muted"
            if (item.sentiment === "Positive") sentimentColor = "positive"
            if (item.sentiment === "Negative") sentimentColor = "negative"

            return (
              <Box key={index}>
                <Flex justify="space-between" align="flex-start" gap="4" mb="1">
                  <Text fontSize="16px" fontWeight="bold" fontFamily="heading" color="text.primary" lineHeight="1.3">
                    {item.title}
                  </Text>
                  <Text
                    color={sentimentColor}
                    fontSize="11px"
                    fontWeight="bold"
                    fontFamily="body"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    whiteSpace="nowrap"
                  >
                    [{item.sentiment}]
                  </Text>
                </Flex>

                <Text fontSize="13px" color="text.primary" mb="2" lineHeight="1.6" fontFamily="body">
                  {item.summary}
                </Text>

                <Flex justify="space-between" align="center" fontSize="11px" color="text.muted" fontFamily="body">
                  <Text fontWeight="semibold">{item.source}</Text>
                  <Text>{item.date}</Text>
                </Flex>
                
                {index < items.length - 1 && (
                  <Separator borderColor="border" borderWidth="1px" mt="4" borderStyle="dashed" />
                )}
              </Box>
            )
          })}
        </Flex>
      </Flex>
    </Box>
  )
}
