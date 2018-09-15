/*
Packate Structure
Descriptor|Action|Length|Value ---------|
1 byte    |1 byte|1 byte|Length * 1 byte|
*/
/* Protocol packet descriptors */

/* Packet Type Descriptor 1 byte */
#define CONFIGURATION 0b00000000
#define PLAYER 0b10000000
#define MINION 0b01000000

/* Action */
/*#define LOCATION 0b00000000*/
#define MOVE 0b00000000
#define ATTACK 0b10000000
#define HEAL 0b01000000
#define CONSTRUCT 0b11000000
