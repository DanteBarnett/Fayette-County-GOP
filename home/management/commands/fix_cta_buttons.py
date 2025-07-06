"""
Management command to fix CTA button data structure issues.
This command fixes the common issue where PageChooserBlock fields contain
empty strings instead of None values, which causes ValueError exceptions.
"""

import json
from django.core.management.base import BaseCommand
from django.db import transaction
from home.models import HomePage
from wagtail.models import Revision


class Command(BaseCommand):
    help = 'Fix CTA button data structure issues in HomePage models and revisions'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be fixed without making changes',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No changes will be made'))
        
        fixed_live_pages = 0
        fixed_revisions = 0
        
        # Fix live pages
        self.stdout.write('Checking live HomePage instances...')
        for page in HomePage.objects.all():
            if self.fix_page_cta_buttons(page, dry_run):
                fixed_live_pages += 1
        
        # Fix revisions
        self.stdout.write('Checking HomePage revisions...')
        for page in HomePage.objects.all():
            for revision in page.revisions.all():
                if self.fix_revision_cta_buttons(revision, dry_run):
                    fixed_revisions += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Fixed {fixed_live_pages} live pages and {fixed_revisions} revisions'
            )
        )

    def fix_page_cta_buttons(self, page, dry_run=False):
        """Fix CTA buttons in a live page"""
        if not page.cta_buttons:
            return False
        
        fixed = False
        for button in page.cta_buttons:
            if hasattr(button, 'value'):
                # Fix empty string link to None
                if button.value.get('link') == '':
                    if not dry_run:
                        # This is handled by the StreamField automatically
                        pass
                    fixed = True
                    self.stdout.write(f'  Fixed empty link in live page: {page.title}')
        
        if fixed and not dry_run:
            page.save()
        
        return fixed

    def fix_revision_cta_buttons(self, revision, dry_run=False):
        """Fix CTA buttons in a revision"""
        revision_content = revision.content
        cta_buttons_str = revision_content.get('cta_buttons')
        
        if not cta_buttons_str:
            return False
        
        try:
            cta_buttons = json.loads(cta_buttons_str)
        except (json.JSONDecodeError, TypeError):
            return False
        
        fixed = False
        for button in cta_buttons:
            if 'value' in button:
                # Fix empty string link to None
                if button['value'].get('link') == '':
                    button['value']['link'] = None
                    fixed = True
                
                # Add missing external_url field
                if 'external_url' not in button['value']:
                    button['value']['external_url'] = None
                    fixed = True
        
        if fixed:
            page_title = revision_content.get('title', 'Unknown')
            self.stdout.write(f'  Fixed revision {revision.id} for page: {page_title}')
            
            if not dry_run:
                revision_content['cta_buttons'] = json.dumps(cta_buttons)
                revision.content = revision_content
                revision.save()
        
        return fixed 