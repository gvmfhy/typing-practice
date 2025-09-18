class TypingEngine {
    constructor() {
        // DOM elements
        this.textDisplay = document.getElementById('textDisplay');
        this.typingInput = document.getElementById('typingInput');
        this.textInputOverlay = document.getElementById('textInputOverlay');
        this.textInput = document.getElementById('textInput');
        this.loadTextBtn = document.getElementById('loadTextBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.loadBtn = document.getElementById('loadBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.progressFill = document.getElementById('progressFill');

        // New modal elements
        this.libraryTab = document.getElementById('libraryTab');
        this.customTab = document.getElementById('customTab');
        this.savedTab = document.getElementById('savedTab');
        this.libraryPanel = document.getElementById('libraryPanel');
        this.customPanel = document.getElementById('customPanel');
        this.savedPanel = document.getElementById('savedPanel');
        this.textList = document.getElementById('textList');
        this.savedList = document.getElementById('savedList');
        this.librarySearch = document.getElementById('librarySearch');
        this.textTitle = document.getElementById('textTitle');
        this.saveText = document.getElementById('saveText');

        // Stats elements
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.progressElement = document.getElementById('progress');

        // State
        this.originalText = '';
        this.currentPosition = 0;
        this.startTime = null;
        this.totalCharacters = 0;
        this.correctCharacters = 0;
        this.incorrectCharacters = 0;
        this.isTypingStarted = false;
        this.lastUpdateTime = 0;
        this.selectedText = null;
        this.currentTab = 'library';

        // Text library
        this.textLibrary = this.initializeTextLibrary();
        this.savedTexts = this.loadSavedTexts();

        // Initialize
        this.init();
    }

    initializeTextLibrary() {
        return [
            {
                id: 'pride-prejudice-1',
                title: 'Pride and Prejudice - Opening',
                author: 'Jane Austen',
                source: 'Public Domain (1813)',
                category: 'literature',
                difficulty: 'medium',
                text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.'
            },
            {
                id: 'notes-underground',
                title: 'Notes from Underground - Opening',
                author: 'Fyodor Dostoevsky',
                source: 'Trans. Pevear & Volokhonsky (Fair Use)',
                category: 'literature',
                difficulty: 'medium',
                text: 'I am a sick man... I am a spiteful man. I am an unattractive man. I think my liver is diseased. However, I don\'t know beans about my disease, and I am not sure what is bothering me.'
            },
            {
                id: 'havel-power-powerless',
                title: 'The Power of the Powerless',
                author: 'Václav Havel',
                source: '1978 Essay (Fair Use Educational)',
                category: 'philosophy',
                difficulty: 'hard',
                text: 'Ideology is a specious way of relating to the world. It offers human beings the illusion of an identity, of dignity, and of morality while making it easier for them to part with them.'
            },
            {
                id: 'havel-hope',
                title: 'Disturbing the Peace - On Hope',
                author: 'Václav Havel',
                source: 'Autobiography Interview (Fair Use)',
                category: 'philosophy',
                difficulty: 'medium',
                text: 'Hope is not prognostication. It is an orientation of the spirit, an orientation of the heart. Either we have hope within us, or we don\'t.'
            },
            {
                id: 'orwell-1984',
                title: '1984 - Opening',
                author: 'George Orwell',
                source: 'Published 1949 (Fair Use)',
                category: 'literature',
                difficulty: 'medium',
                text: 'It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.'
            },
            {
                id: 'thoreau-walden',
                title: 'Walden - Deliberately',
                author: 'Henry David Thoreau',
                source: 'Public Domain (1854)',
                category: 'philosophy',
                difficulty: 'hard',
                text: 'I went to the woods to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.'
            },
            {
                id: 'descartes-cogito',
                title: 'Discourse on Method - Cogito',
                author: 'René Descartes',
                source: 'Public Domain (1637)',
                category: 'philosophy',
                difficulty: 'hard',
                text: 'I think, therefore I am. But immediately upon this I observed that, whilst I thus wished to think that all was false, it was absolutely necessary that I, who thus thought, should be somewhat.'
            },
            {
                id: 'frost-road',
                title: 'The Road Not Taken',
                author: 'Robert Frost',
                source: 'Public Domain (1916)',
                category: 'poetry',
                difficulty: 'easy',
                text: 'Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood and looked down one as far as I could to where it bent in the undergrowth.'
            },
            {
                id: 'shakespeare-hamlet',
                title: 'Hamlet - Soliloquy',
                author: 'William Shakespeare',
                source: 'Public Domain (1603)',
                category: 'poetry',
                difficulty: 'medium',
                text: 'To be, or not to be, that is the question: Whether \'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them.'
            },
            {
                id: 'dickens-tale',
                title: 'A Tale of Two Cities - Opening',
                author: 'Charles Dickens',
                source: 'Public Domain (1859)',
                category: 'literature',
                difficulty: 'medium',
                text: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness.'
            },
            {
                id: 'tech-algorithms',
                title: 'Algorithm Definition',
                author: 'Computer Science',
                source: 'Academic Definition',
                category: 'technical',
                difficulty: 'hard',
                text: 'An algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation. Algorithms are unambiguous specifications for performing calculation, data processing, automated reasoning, and other tasks.'
            },
            {
                id: 'tech-javascript',
                title: 'JavaScript Overview',
                author: 'Programming',
                source: 'Technical Definition',
                category: 'technical',
                difficulty: 'medium',
                text: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.'
            }
        ];
    }

    init() {
        this.setupEventListeners();
        this.setupOCR();
        this.loadTheme();
        this.initializeStats();
        this.populateTextLibrary();
        this.populateSavedTexts();
        this.focusTypingInput();
    }

    initializeStats() {
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100%';
        this.progressElement.textContent = '0%';
        this.progressFill.style.width = '0%';

        this.wpmElement.style.transition = 'transform 0.15s ease';
        this.accuracyElement.style.transition = 'transform 0.15s ease, color 0.3s ease';
        this.progressFill.style.transition = 'width 0.3s ease';
    }

    setupEventListeners() {
        // Text loading
        this.loadTextBtn.addEventListener('click', () => this.showTextInput());
        this.resetBtn.addEventListener('click', () => this.resetTyping());
        this.loadBtn.addEventListener('click', () => this.loadSelectedText());
        this.cancelBtn.addEventListener('click', () => this.hideTextInput());

        // Tab switching
        this.libraryTab.addEventListener('click', () => this.switchTab('library'));
        this.customTab.addEventListener('click', () => this.switchTab('custom'));
        this.savedTab.addEventListener('click', () => this.switchTab('saved'));

        // Library search and filtering
        this.librarySearch.addEventListener('input', () => this.filterLibrary());

        // Category filtering
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterByCategory(e.target.dataset.category));
        });

        // Dark mode toggle
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());

        // Typing input
        this.typingInput.addEventListener('input', (e) => this.handleInput(e));
        this.typingInput.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Custom text input changes
        this.textInput.addEventListener('input', () => this.updateLoadButton());

        // Click anywhere to focus typing input
        document.addEventListener('click', (e) => {
            if (!e.target.closest('button') && !e.target.closest('.text-input-modal')) {
                this.focusTypingInput();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.metaKey || e.ctrlKey) {
                switch(e.key.toLowerCase()) {
                    case 'l':
                        e.preventDefault();
                        this.showTextInput();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.resetTyping();
                        break;
                    case 'd':
                        e.preventDefault();
                        this.toggleDarkMode();
                        break;
                }
            }
        });

        // Close modal on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideTextInput();
            }
        });
    }

    // OCR Setup
    setupOCR() {
        const dropZone = document.getElementById('ocrDropZone');
        const fileInput = document.getElementById('fileInput');
        const ocrStatus = document.getElementById('ocrStatus');
        const selectionHelper = document.getElementById('selectionHelper');
        const useSelectedBtn = document.getElementById('useSelectedBtn');

        // Click to open file picker
        dropZone.addEventListener('click', () => fileInput.click());

        // File input change
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.processFile(file);
        });

        // Drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');

            const file = e.dataTransfer.files[0];
            if (file) this.processFile(file);
        });

        // Paste screenshot
        document.addEventListener('paste', async (e) => {
            // Only process if Custom Text tab is active and modal is open
            if (this.currentTab !== 'custom' || !this.textInputOverlay.classList.contains('active')) {
                return;
            }

            const items = e.clipboardData.items;
            for (let item of items) {
                if (item.type.indexOf('image') !== -1) {
                    const blob = item.getAsFile();
                    await this.processFile(blob);
                    break;
                }
            }
        });

        // Text selection helper
        this.textInput.addEventListener('select', () => {
            const selectedText = this.textInput.value.substring(
                this.textInput.selectionStart,
                this.textInput.selectionEnd
            );

            if (selectedText.length > 10) {
                selectionHelper.style.display = 'block';
            } else {
                selectionHelper.style.display = 'none';
            }
        });

        // Use selected text button
        useSelectedBtn.addEventListener('click', () => {
            const selectedText = this.textInput.value.substring(
                this.textInput.selectionStart,
                this.textInput.selectionEnd
            );

            if (selectedText) {
                this.textInput.value = selectedText;
                selectionHelper.style.display = 'none';
                this.updateLoadButton();
            }
        });
    }

    async processFile(file) {
        const ocrStatus = document.getElementById('ocrStatus');

        try {
            // Process based on file type
            if (file.type === 'application/pdf') {
                // Open PDF in viewer for visual selection
                await this.openPDFViewer(file);
            } else if (file.type.startsWith('image/')) {
                // For images, use OCR directly
                ocrStatus.style.display = 'block';
                ocrStatus.innerHTML = '<div class="ocr-loading">Extracting text...</div>';

                const extractedText = await this.extractFromImage(file);

                // Success - populate text area
                this.textInput.value = extractedText;
                ocrStatus.innerHTML = '<div style="color: var(--accent-green);">✓ Text extracted successfully! Review and edit below.</div>';

                // Show selection helper for long texts
                if (extractedText.length > 500) {
                    document.getElementById('selectionHelper').style.display = 'block';
                }

                // Update load button
                this.updateLoadButton();

                // Hide status after delay
                setTimeout(() => {
                    ocrStatus.style.display = 'none';
                }, 3000);
            } else {
                throw new Error('Unsupported file type. Please use PDF or image files.');
            }

        } catch (error) {
            ocrStatus.innerHTML = `<div style="color: var(--accent-red);">Error: ${error.message}</div>`;
            setTimeout(() => {
                ocrStatus.style.display = 'none';
            }, 5000);
        }
    }

    async extractFromImage(file) {
        // Create image URL
        const imageUrl = URL.createObjectURL(file);

        try {
            // Try Scribe.js first if available (better accuracy)
            if (window.scribe && window.scribe.extractText) {
                console.log('Using Scribe.js for OCR');
                const result = await window.scribe.extractText(imageUrl);
                URL.revokeObjectURL(imageUrl);
                return result;
            }

            // Fallback to Tesseract.js (always available)
            if (window.Tesseract) {
                console.log('Using Tesseract.js for OCR');
                const result = await Tesseract.recognize(
                    imageUrl,
                    'eng',
                    {
                        logger: m => {
                            if (m.status === 'recognizing text') {
                                const progress = Math.round(m.progress * 100);
                                document.getElementById('ocrStatus').innerHTML =
                                    `<div class="ocr-loading">Extracting text... ${progress}%</div>`;
                            }
                        }
                    }
                );
                URL.revokeObjectURL(imageUrl);
                return result.data.text;
            }

            throw new Error('No OCR library available');

        } catch (error) {
            URL.revokeObjectURL(imageUrl);
            throw error;
        }
    }

    // PDF Viewer functionality
    async openPDFViewer(file) {
        const overlay = document.getElementById('pdfViewerOverlay');
        overlay.classList.add('active');

        // Initialize PDF.js
        const fileUrl = URL.createObjectURL(file);
        const loadingTask = pdfjsLib.getDocument(fileUrl);

        try {
            this.pdfDocument = await loadingTask.promise;
            this.totalPages = this.pdfDocument.numPages;
            this.currentPage = 1;
            this.currentScale = 1.0;

            // Setup viewer controls
            this.setupPDFControls();

            // Render first page
            await this.renderPDFPage(this.currentPage);

            // Update page count
            document.getElementById('pdfPageCount').textContent = this.totalPages;

        } catch (error) {
            console.error('Error loading PDF:', error);
            overlay.classList.remove('active');
            throw new Error('Failed to load PDF. Please try again or use a screenshot.');
        }
    }

    setupPDFControls() {
        const overlay = document.getElementById('pdfViewerOverlay');
        const pdfViewerBody = overlay.querySelector('.pdf-viewer-body');

        // Close button
        document.getElementById('pdfCloser').onclick = () => {
            overlay.classList.remove('active');
            URL.revokeObjectURL(this.pdfDocument.url);
        };

        // Navigation
        document.getElementById('pdfPrevPage').onclick = () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPDFPage(this.currentPage);
            }
        };

        document.getElementById('pdfNextPage').onclick = () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.renderPDFPage(this.currentPage);
            }
        };

        // Scroll wheel navigation for continuous browsing
        pdfViewerBody.addEventListener('wheel', (e) => {
            const scrollThreshold = 50; // pixels to trigger page change
            const atBottom = pdfViewerBody.scrollTop + pdfViewerBody.clientHeight >= pdfViewerBody.scrollHeight - 5;
            const atTop = pdfViewerBody.scrollTop <= 5;

            if (e.deltaY > scrollThreshold && atBottom && this.currentPage < this.totalPages) {
                // Scrolling down at bottom of page - go to next page
                this.currentPage++;
                this.renderPDFPage(this.currentPage);
                pdfViewerBody.scrollTop = 0;
                e.preventDefault();
            } else if (e.deltaY < -scrollThreshold && atTop && this.currentPage > 1) {
                // Scrolling up at top of page - go to previous page
                this.currentPage--;
                this.renderPDFPage(this.currentPage);
                pdfViewerBody.scrollTop = pdfViewerBody.scrollHeight;
                e.preventDefault();
            }
        });

        // Zoom controls
        document.getElementById('pdfZoomIn').onclick = () => {
            this.currentScale = Math.min(this.currentScale * 1.2, 3.0);
            this.renderPDFPage(this.currentPage);
        };

        document.getElementById('pdfZoomOut').onclick = () => {
            this.currentScale = Math.max(this.currentScale / 1.2, 0.5);
            this.renderPDFPage(this.currentPage);
        };

        // Extract all text button
        document.getElementById('pdfExtractAll').onclick = async () => {
            const text = await this.extractAllPDFText();
            this.textInput.value = text;
            overlay.classList.remove('active');
            this.updateLoadButton();

            // Show selection helper for long texts
            if (text.length > 500) {
                document.getElementById('selectionHelper').style.display = 'block';
            }
        };

        // Use selected text button
        document.getElementById('pdfUseSelected').onclick = () => {
            const selectedText = window.getSelection().toString();
            if (selectedText) {
                this.textInput.value = selectedText;
                overlay.classList.remove('active');
                this.updateLoadButton();
            }
        };

        // Monitor text selection - use mouseup for better PDF text layer selection
        const pdfTextLayer = document.getElementById('pdfTextLayer');
        let isSelecting = false;

        const checkSelection = () => {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            const useSelectedBtn = document.getElementById('pdfUseSelected');

            if (selectedText && selectedText.length > 10) {
                useSelectedBtn.disabled = false;
                document.getElementById('pdfSelectionInfo').textContent =
                    `✓ Selected ${selectedText.length} characters`;
                document.getElementById('pdfSelectionInfo').style.color = 'var(--accent-primary)';

                // Add visual highlight to selected spans
                const range = selection.getRangeAt(0);
                const spans = pdfTextLayer.querySelectorAll('span');
                spans.forEach(span => {
                    if (selection.containsNode(span, true)) {
                        span.style.backgroundColor = 'rgba(0, 122, 255, 0.2)';
                    } else {
                        span.style.backgroundColor = '';
                    }
                });
            } else {
                useSelectedBtn.disabled = true;
                document.getElementById('pdfSelectionInfo').textContent =
                    'Select text in the PDF, then click "Use Selected Text"';
                document.getElementById('pdfSelectionInfo').style.color = '';

                // Clear highlights
                const spans = pdfTextLayer.querySelectorAll('span');
                spans.forEach(span => span.style.backgroundColor = '');
            }
        };

        // Track mouse selection
        pdfTextLayer.addEventListener('mousedown', () => {
            isSelecting = true;
            // Clear any existing selection highlights
            const spans = pdfTextLayer.querySelectorAll('span');
            spans.forEach(span => span.style.backgroundColor = '');
        });

        pdfTextLayer.addEventListener('mousemove', () => {
            if (isSelecting) {
                checkSelection();
            }
        });

        pdfTextLayer.addEventListener('mouseup', () => {
            isSelecting = false;
            checkSelection();
        });

        // Check selection on touch and keyboard events
        pdfTextLayer.addEventListener('touchend', checkSelection);
        document.addEventListener('selectionchange', () => {
            if (overlay.classList.contains('active')) {
                checkSelection();
            }
        });
    }

    async renderPDFPage(pageNum) {
        const page = await this.pdfDocument.getPage(pageNum);
        const canvas = document.getElementById('pdfCanvas');
        const context = canvas.getContext('2d');

        // Calculate viewport
        const viewport = page.getViewport({ scale: this.currentScale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render PDF page
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        // Extract and overlay text for selection
        const textContent = await page.getTextContent();
        const textLayer = document.getElementById('pdfTextLayer');
        textLayer.innerHTML = '';
        textLayer.style.width = viewport.width + 'px';
        textLayer.style.height = viewport.height + 'px';

        // Create selectable text layer
        const textDivs = [];
        pdfjsLib.renderTextLayer({
            textContent: textContent,
            container: textLayer,
            viewport: viewport,
            textDivs: textDivs
        });

        // Make text selectable by ensuring proper CSS
        textLayer.style.pointerEvents = 'auto';
        textLayer.style.userSelect = 'text';
        textLayer.style.cursor = 'text';

        // Update UI
        document.getElementById('pdfPageNum').textContent = pageNum;
        document.getElementById('pdfZoomLevel').textContent = Math.round(this.currentScale * 100) + '%';
    }

    async extractAllPDFText() {
        let fullText = '';
        for (let i = 1; i <= this.totalPages; i++) {
            const page = await this.pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }
        return fullText.trim();
    }

    // Tab Management
    switchTab(tabName) {
        this.currentTab = tabName;

        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

        // Activate selected tab
        document.getElementById(`${tabName}Tab`).classList.add('active');
        document.getElementById(`${tabName}Panel`).classList.add('active');

        this.updateLoadButton();
    }

    // Text Library Management
    populateTextLibrary() {
        this.textList.innerHTML = '';

        this.textLibrary.forEach(text => {
            const item = this.createTextItem(text);
            this.textList.appendChild(item);
        });
    }

    createTextItem(text) {
        const item = document.createElement('div');
        item.className = 'text-item';
        item.dataset.id = text.id;

        const wordsCount = text.text.split(' ').length;
        const difficulty = text.difficulty === 'easy' ? '●○○' :
                          text.difficulty === 'medium' ? '●●○' : '●●●';

        item.innerHTML = `
            <div class="text-item-title">${text.title}</div>
            <div class="text-item-author">${text.author}</div>
            <div class="text-item-preview">${text.text.substring(0, 120)}...</div>
            <div class="text-item-meta">
                <span>${wordsCount} words</span>
                <span>${difficulty}</span>
                <span class="text-item-source">${text.source}</span>
            </div>
        `;

        item.addEventListener('click', () => this.selectLibraryText(text));

        return item;
    }

    selectLibraryText(text) {
        // Clear previous selection
        document.querySelectorAll('.text-item').forEach(item => item.classList.remove('selected'));
        document.querySelectorAll('.saved-item').forEach(item => item.classList.remove('selected'));

        // Select this item
        document.querySelector(`[data-id="${text.id}"]`).classList.add('selected');
        this.selectedText = text.text;
        this.updateLoadButton();
    }

    filterLibrary() {
        const query = this.librarySearch.value.toLowerCase();
        const activeCategory = document.querySelector('.category-btn.active').dataset.category;

        document.querySelectorAll('.text-item').forEach(item => {
            const text = this.textLibrary.find(t => t.id === item.dataset.id);
            const matchesSearch = text.title.toLowerCase().includes(query) ||
                                text.author.toLowerCase().includes(query) ||
                                text.text.toLowerCase().includes(query);
            const matchesCategory = activeCategory === 'all' || text.category === activeCategory;

            item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    }

    filterByCategory(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.filterLibrary();
    }

    // Saved Texts Management
    loadSavedTexts() {
        const saved = localStorage.getItem('saved-texts');
        return saved ? JSON.parse(saved) : [];
    }

    saveSavedTexts() {
        localStorage.setItem('saved-texts', JSON.stringify(this.savedTexts));
    }

    populateSavedTexts() {
        this.savedList.innerHTML = '';

        if (this.savedTexts.length === 0) {
            this.savedList.innerHTML = '<div class="empty-state"><p>No saved texts yet. Save custom texts to see them here.</p></div>';
            return;
        }

        this.savedTexts.forEach((text, index) => {
            const item = this.createSavedItem(text, index);
            this.savedList.appendChild(item);
        });
    }

    createSavedItem(text, index) {
        const item = document.createElement('div');
        item.className = 'saved-item';
        item.dataset.index = index;

        const preview = text.text.substring(0, 120) + (text.text.length > 120 ? '...' : '');
        const wordsCount = text.text.split(' ').length;

        item.innerHTML = `
            <div class="saved-item-header">
                <div class="saved-item-title">${text.title || 'Untitled'}</div>
                <button class="saved-item-delete" title="Delete">×</button>
            </div>
            <div class="saved-item-preview">${preview}</div>
            <div class="text-item-meta">
                <span>${wordsCount} words</span>
                <span>Saved ${new Date(text.savedAt).toLocaleDateString()}</span>
            </div>
        `;

        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('saved-item-delete')) {
                this.selectSavedText(text, index);
            }
        });

        item.querySelector('.saved-item-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteSavedText(index);
        });

        return item;
    }

    selectSavedText(text, index) {
        // Clear previous selection
        document.querySelectorAll('.text-item').forEach(item => item.classList.remove('selected'));
        document.querySelectorAll('.saved-item').forEach(item => item.classList.remove('selected'));

        // Select this item
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
        this.selectedText = text.text;
        this.updateLoadButton();
    }

    deleteSavedText(index) {
        if (confirm('Delete this saved text?')) {
            this.savedTexts.splice(index, 1);
            this.saveSavedTexts();
            this.populateSavedTexts();
            this.selectedText = null;
            this.updateLoadButton();
        }
    }

    // Modal Management
    showTextInput() {
        this.textInputOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (this.currentTab === 'library') {
            this.librarySearch.focus();
        } else if (this.currentTab === 'custom') {
            this.textInput.focus();
        }
    }

    hideTextInput() {
        this.textInputOverlay.classList.remove('active');
        document.body.style.overflow = '';
        this.selectedText = null;
        this.updateLoadButton();
        this.focusTypingInput();
    }

    updateLoadButton() {
        const hasSelection = this.selectedText ||
                           (this.currentTab === 'custom' && this.textInput.value.trim());

        this.loadBtn.disabled = !hasSelection;
    }

    loadSelectedText() {
        let textToLoad = '';
        let titleToSave = '';

        if (this.currentTab === 'library' || this.currentTab === 'saved') {
            textToLoad = this.selectedText;
        } else if (this.currentTab === 'custom') {
            textToLoad = this.textInput.value.trim();
            titleToSave = this.textTitle.value.trim();

            // Save custom text if requested
            if (this.saveText.checked && textToLoad) {
                const savedText = {
                    title: titleToSave || 'Untitled',
                    text: textToLoad,
                    savedAt: Date.now()
                };

                this.savedTexts.push(savedText);
                this.saveSavedTexts();
                this.populateSavedTexts();

                // Clear the form
                this.textInput.value = '';
                this.textTitle.value = '';
                this.saveText.checked = false;
            }
        }

        if (!textToLoad) {
            alert('Please select or enter some text to practice with.');
            return;
        }

        this.originalText = textToLoad;
        this.setupText();
        this.resetTyping();
        this.hideTextInput();
        this.resetBtn.disabled = false;

        console.log(`New text loaded: ${textToLoad.length} characters`);
    }

    setupText() {
        this.textDisplay.innerHTML = '';
        this.textDisplay.classList.remove('empty');

        // Split text into words to handle wrapping better
        const words = this.originalText.split(' ');
        let charIndex = 0;

        words.forEach((word, wordIndex) => {
            // Create spans for each character in the word
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const span = document.createElement('span');
                span.className = 'char untyped';
                span.dataset.index = charIndex;

                if (char === '\n') {
                    span.innerHTML = '<br>';
                    span.classList.add('linebreak');
                } else if (char === '\t') {
                    span.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                    span.classList.add('tab');
                } else {
                    span.textContent = char;
                }

                this.textDisplay.appendChild(span);
                charIndex++;
            }

            // Add space after word (except for last word)
            if (wordIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'char untyped space';
                spaceSpan.dataset.index = charIndex;
                spaceSpan.innerHTML = '&nbsp;';
                this.textDisplay.appendChild(spaceSpan);
                charIndex++;
            }
        });

        this.typingInput.disabled = false;
        this.updateCurrentCharacter();
        this.focusTypingInput();
    }

    resetTyping() {
        if (!this.originalText) return;

        this.currentPosition = 0;
        this.startTime = null;
        this.totalCharacters = 0;
        this.correctCharacters = 0;
        this.incorrectCharacters = 0;
        this.isTypingStarted = false;
        this.lastUpdateTime = 0;

        this.typingInput.value = '';
        this.typingInput.disabled = false;

        const chars = this.textDisplay.querySelectorAll('.char');
        chars.forEach(char => {
            char.className = 'char untyped';
            if (char.classList.contains('space')) char.classList.add('space');
            if (char.classList.contains('linebreak')) char.classList.add('linebreak');
            if (char.classList.contains('tab')) char.classList.add('tab');
        });

        this.updateCurrentCharacter();
        this.resetStatsDisplay();
        this.focusTypingInput();
    }

    resetStatsDisplay() {
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100%';
        this.progressElement.textContent = '0%';
        this.progressFill.style.width = '0%';

        this.accuracyElement.classList.remove('high-accuracy', 'medium-accuracy', 'low-accuracy');
    }

    handleInput(e) {
        if (!this.originalText) return;

        const inputValue = this.typingInput.value;
        const inputLength = inputValue.length;

        if (!this.isTypingStarted && inputLength > 0) {
            this.startTime = Date.now();
            this.isTypingStarted = true;
        }

        this.validateInput(inputValue);

        const now = Date.now();
        if (now - this.lastUpdateTime > 100) {
            this.updateStats();
            this.lastUpdateTime = now;
        }

        if (this.currentPosition >= this.originalText.length) {
            this.completeTyping();
        }
    }

    handleKeydown(e) {
        if (e.key === 'Backspace') {
            this.handleBackspace();
        }
    }

    validateInput(inputValue) {
        this.currentPosition = Math.min(inputValue.length, this.originalText.length);

        // Update all characters based on input
        for (let i = 0; i < this.originalText.length; i++) {
            const charElement = this.textDisplay.querySelector(`[data-index="${i}"]`);
            if (!charElement) continue;

            // Reset classes
            charElement.className = 'char';
            if (charElement.classList.contains('space')) charElement.classList.add('space');
            if (charElement.classList.contains('linebreak')) charElement.classList.add('linebreak');
            if (charElement.classList.contains('tab')) charElement.classList.add('tab');

            if (i < inputValue.length) {
                const typedChar = inputValue[i];
                const originalChar = this.originalText[i];

                if (typedChar === originalChar) {
                    charElement.classList.add('correct');
                } else {
                    charElement.classList.add('incorrect');
                }
            } else {
                charElement.classList.add('untyped');
            }
        }

        this.updateCurrentCharacter();
        this.updateProgress();
    }

    handleBackspace() {
        setTimeout(() => {
            this.validateInput(this.typingInput.value);
        }, 0);
    }

    updateCurrentCharacter() {
        const chars = this.textDisplay.querySelectorAll('.char');

        chars.forEach(char => char.classList.remove('current'));

        // Find the character at current position using data-index
        const currentChar = this.textDisplay.querySelector(`[data-index="${this.currentPosition}"]`);
        if (currentChar) {
            currentChar.classList.add('current');
        }
    }

    updateStats() {
        if (!this.isTypingStarted) {
            this.wpmElement.textContent = '0';
            this.accuracyElement.textContent = '100%';
            this.updateProgress();
            return;
        }

        let correct = 0;
        let incorrect = 0;

        for (let i = 0; i < this.currentPosition; i++) {
            const charElement = this.textDisplay.querySelector(`[data-index="${i}"]`);
            if (charElement && charElement.classList.contains('correct')) {
                correct++;
            } else if (charElement && charElement.classList.contains('incorrect')) {
                incorrect++;
            }
        }

        this.correctCharacters = correct;
        this.incorrectCharacters = incorrect;
        this.totalCharacters = correct + incorrect;

        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
        const wordsTyped = this.correctCharacters / 5;
        const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

        const accuracy = this.totalCharacters > 0
            ? Math.round((this.correctCharacters / this.totalCharacters) * 100)
            : 100;

        this.animateStatUpdate(this.wpmElement, wpm.toString());
        this.animateStatUpdate(this.accuracyElement, `${accuracy}%`);

        this.updateProgress();
        this.updateAccuracyColors(accuracy);
    }

    animateStatUpdate(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.textContent = newValue;

            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    updateAccuracyColors(accuracy) {
        this.accuracyElement.classList.remove('high-accuracy', 'medium-accuracy', 'low-accuracy');

        if (accuracy >= 95) {
            this.accuracyElement.classList.add('high-accuracy');
        } else if (accuracy >= 85) {
            this.accuracyElement.classList.add('medium-accuracy');
        } else {
            this.accuracyElement.classList.add('low-accuracy');
        }
    }

    updateProgress() {
        const progress = this.originalText.length > 0
            ? Math.round((this.currentPosition / this.originalText.length) * 100)
            : 0;

        this.progressElement.textContent = `${progress}%`;
        this.progressFill.style.width = `${progress}%`;
    }

    completeTyping() {
        this.isTypingStarted = false;
        this.updateStats();

        const totalTime = this.startTime ? Math.round((Date.now() - this.startTime) / 1000) : 0;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        const timeFormatted = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

        this.typingInput.disabled = true;

        setTimeout(() => {
            const stats = this.getComprehensiveStats();
            const message = `🎉 Typing Practice Complete!\n\n` +
                          `⚡ Final WPM: ${stats.wpm}\n` +
                          `🎯 Accuracy: ${stats.accuracy}%\n` +
                          `⏱️ Time: ${timeFormatted}\n` +
                          `✅ Correct Characters: ${stats.correctCharacters}\n` +
                          `❌ Incorrect Characters: ${stats.incorrectCharacters}\n` +
                          `📝 Total Characters: ${stats.totalLength}\n` +
                          `📊 Progress: 100%`;

            alert(message);
        }, 300);
    }

    getComprehensiveStats() {
        const timeElapsed = this.startTime ? (Date.now() - this.startTime) / 1000 : 0;

        return {
            wpm: parseInt(this.wpmElement.textContent) || 0,
            accuracy: parseInt(this.accuracyElement.textContent.replace('%', '')) || 100,
            timeElapsed: Math.round(timeElapsed),
            correctCharacters: this.correctCharacters,
            incorrectCharacters: this.incorrectCharacters,
            totalTyped: this.totalCharacters,
            totalLength: this.originalText.length,
            progress: 100
        };
    }

    focusTypingInput() {
        if (this.originalText && !this.typingInput.disabled) {
            this.typingInput.focus();
        }
    }

    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Initialize the typing engine when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TypingEngine();
});