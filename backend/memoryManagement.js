const v8 = require('v8');
const fs = require('fs');

const MAX_HEAP_SIZE = 400 * 1024 * 1024; // 400 MB in bytes
const CHECK_INTERVAL = 60000; // Check every minute

function checkMemoryUsage() {
  const heapStats = v8.getHeapStatistics();
  const usedHeap = heapStats.used_heap_size;
  
  console.log(`Current heap usage: ${Math.round(usedHeap / 1024 / 1024)} MB`);

  if (usedHeap > MAX_HEAP_SIZE) {
    console.log('Heap size exceeded 400 MB. Attempting to garbage collect...');
    try {
      if (global.gc) {
        global.gc();
        console.log('Garbage collection completed.');
      } else {
        console.log('Garbage collection is not exposed. Run node with --expose-gc flag.');
      }
    } catch (e) {
      console.error('Error during garbage collection:', e);
    }

    // Log memory usage to a file
    const logMessage = `${new Date().toISOString()} - Heap usage: ${Math.round(usedHeap / 1024 / 1024)} MB\n`;
    fs.appendFile('memory_usage.log', logMessage, (err) => {
      if (err) console.error('Error writing to log file:', err);
    });
  }
}

// Start memory check interval
setInterval(checkMemoryUsage, CHECK_INTERVAL);

console.log('Memory management initialized. Checking every', CHECK_INTERVAL / 1000, 'seconds.');

module.exports = { checkMemoryUsage };