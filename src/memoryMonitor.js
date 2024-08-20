const v8 = require('v8');
const fs = require('fs');
const path = require('path');

class MemoryMonitor {
  constructor(options = {}) {
    this.interval = options.interval || 60000; // Default to 1 minute
    this.warningThreshold = options.warningThreshold || 0.7; // 70% of heap limit
    this.criticalThreshold = options.criticalThreshold || 0.9; // 90% of heap limit
    this.logFile = options.logFile || path.join(__dirname, 'memory-usage.log');
    this.previousUsage = process.memoryUsage();
    this.startTime = Date.now();
  }

  start() {
    this.timer = setInterval(() => this.checkMemory(), this.interval);
  }

  stop() {
    clearInterval(this.timer);
  }

  formatBytes(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  checkMemory() {
    const currentUsage = process.memoryUsage();
    const heapStats = v8.getHeapStatistics();
    const usedHeapPercentage = currentUsage.heapUsed / heapStats.heap_size_limit;

    const memoryInfo = {
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000) + ' seconds',
      rss: this.formatBytes(currentUsage.rss),
      heapTotal: this.formatBytes(currentUsage.heapTotal),
      heapUsed: this.formatBytes(currentUsage.heapUsed),
      external: this.formatBytes(currentUsage.external),
      arrayBuffers: this.formatBytes(currentUsage.arrayBuffers),
      heapSizeLimit: this.formatBytes(heapStats.heap_size_limit),
      usedHeapPercentage: (usedHeapPercentage * 100).toFixed(2) + '%'
    };

    // Calculate memory deltas
    for (const key in currentUsage) {
      if (this.previousUsage[key]) {
        memoryInfo[`delta_${key}`] = this.formatBytes(currentUsage[key] - this.previousUsage[key]);
      }
    }

    this.previousUsage = currentUsage;

    // Log memory information
    this.logMemoryInfo(memoryInfo);

    // Check for warning and critical levels
    if (usedHeapPercentage > this.criticalThreshold) {
      this.handleCriticalMemoryUsage(memoryInfo);
    } else if (usedHeapPercentage > this.warningThreshold) {
      this.handleWarningMemoryUsage(memoryInfo);
    }
  }

  logMemoryInfo(info) {
    const logMessage = `${JSON.stringify(info)}\n`;
    fs.appendFile(this.logFile, logMessage, (err) => {
      if (err) console.error('Error writing to memory log:', err);
    });
    console.log('Memory Usage:', info);
  }

  handleWarningMemoryUsage(info) {
    console.warn('WARNING: High memory usage detected', info);
    // You could add more actions here, like sending an alert
  }

  handleCriticalMemoryUsage(info) {
    console.error('CRITICAL: Memory usage near limit', info);
    // You could add more drastic actions here, like forcing garbage collection or restarting the process
    if (global.gc) {
      console.log('Forcing garbage collection');
      global.gc();
    }
  }
}

module.exports = MemoryMonitor;